// import z from "zod";
import { Booking } from "@prisma/client";
import { prisma } from "../../core/prisma/client";
import { BadRequestError, ConflictError, NotFoundError } from "../../lib/api_error";
import promiseWrapper from "../../lib/promise_wrapper";
import { toBookingDTO } from "./booking.mapper";
import { BookingRepository } from "./booking.repo";
import { calculateEndTime } from "./booking.rule";
import moment from 'moment'
import { bookingActivationQueue, bookingExpirationQueue, getActivationJobId, getExpirationJobId } from "../../infra/messaging/queue/queues/booking.queue";

export class BookingService {
  private readonly bookingRepository: BookingRepository

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository
  }

  public getAllBookings = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.bookingRepository.findMany({

      })
      return resolve(
        result.map(toBookingDTO)
      );
    }
  )

  public getSingleBooking = async (booking_id: number) => promiseWrapper(
    async (resolve) => {
      const result = await this.bookingRepository.findById(booking_id)
      return resolve(
        toBookingDTO(result!)
      );
    }
  )

  public listUserBookings = async (user_id: number) => promiseWrapper(
    async (resolve) => {
      const bookings = await this.bookingRepository.findMany({
        user_id,
        // NOT: {
        //   status: 'CANCELLED'
        // }
      });

      return resolve(
        bookings.map(toBookingDTO)
      );
    }
  )


  public createBooking = async (
    user_id: number,
    place_id: number,
    start_time: Date,
    requested_duration_minutes: number
  ) =>
    promiseWrapper<Booking>(async (resolve) => {

      const booking = await prisma.$transaction(async (tx) => {        
        const end_time = calculateEndTime(
          new Date(start_time),
          requested_duration_minutes
        );

        // 1️⃣ Lock place row (prevent concurrent bookings)
        await tx.$executeRaw`SET TRANSACTION ISOLATION LEVEL SERIALIZABLE`;
        await tx.$executeRawUnsafe(
          `LOCK TABLE places IN ACCESS EXCLUSIVE MODE`
        );

        // 2️⃣ Fetch place
        const place = await tx.place.findUnique({
          where: { id: place_id },
        });

        if (!place || !place.is_active) {
          throw new NotFoundError("Place not available");
        }

        // 3️⃣ Validate duration
        if (requested_duration_minutes < place.min_duration_minutes) {
          throw new BadRequestError(
            "Duration is below minimum allowed"
          );
        }


        // 5️⃣ Prevent overlapping (PENDING + ACTIVE)
        const conflict = await tx.booking.findFirst({
          where: {
            place_id,
            status: {
              in: ["INITIAL", "ACTIVE"],
            },
            AND: [
              { start_time: { lt: end_time } },
              { end_time: { gt: start_time } },
            ],
          },
        });

        if (conflict) {
          throw new ConflictError(
            "Place is not available at this time"
          );
        }

        // 6️⃣ Pricing
        const totalHours = Math.ceil(
          requested_duration_minutes / 60
        );

        const total_price =
          totalHours * Number(place.price_per_hour);

        // 7️⃣ Create booking
        const now = moment.utc();
        const status = now.isSameOrAfter(start_time) ? "ACTIVE" : "INITIAL";

        const booking = await tx.booking.create({
          data: {
            user_id,
            place_id,
            start_time,
            end_time,
            requested_duration_minutes,
            actual_duration_minutes: requested_duration_minutes,
            price_per_hour: place.price_per_hour,
            total_price,
            status,
          },
        });

        // 8️⃣ Create payment (mock)
        await tx.payment.create({
          data: {
            booking_id: booking.id,
            user_id,
            amount: total_price,
            method: "CASH",
            status: "PAID",
            paid_at: new Date(),
          },
        });

        return booking;
      });

      if(booking.status == "INITIAL") {
        await bookingActivationQueue.add(
          "booking:activate",
          { booking_id: booking.id },
          { delay: (booking.start_time.getTime() - Date.now()), jobId: getActivationJobId(booking.id) }
        )
      }

      if(booking.status == "ACTIVE") {
        await bookingExpirationQueue.add(
          "booking:expire",
          { booking_id: booking.id },
          { delay: (booking.end_time.getTime() - Date.now()), jobId: getExpirationJobId(booking.id) }
        )
      }

      return resolve(booking);
    });


  public cancelBooking = async (booking_id: number) =>
    promiseWrapper(async (resolve) => {
      const result = await prisma.$transaction(async (tx) => {
        // 1️⃣ Fetch booking
        const booking = await tx.booking.findUnique({
          where: { id: booking_id },
          include: { payment: true },
        });

        if (!booking) {
          throw new NotFoundError("Booking not found");
        }

        // 2️⃣ Validate status
        if (booking.status === "COMPLETED") {
          throw new BadRequestError(
            "Completed bookings cannot be cancelled"
          );
        }

        // 3️⃣ Validate time
        const now = new Date();
        if (now >= booking.start_time) {
          throw new BadRequestError(
            "Booking cannot be cancelled after it has started"
          );
        }

        if (booking.status === "CANCELLED") {
          throw new BadRequestError("Booking already cancelled");
        }

        // 4️⃣ Cancel booking
        const cancelledBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            status: "CANCELLED",
          },
        });

        // 5️⃣ Update payment (mock refund)
        if (booking.payment) {
          await tx.payment.update({
            where: { id: booking.payment.id },
            data: {
              status: "REFUNDED",
            },
          });
        }

        return cancelledBooking;
      });

      await bookingActivationQueue.remove(getActivationJobId(result.id))
      await bookingExpirationQueue.remove(getExpirationJobId(result.id))

      return resolve(toBookingDTO(result));
    });


  public extendBooking = async (
    booking_id: number,
    extraMinutes: number
  ) =>
    promiseWrapper(async (resolve) => {
      const result = await prisma.$transaction(async (tx) => {
        // 1️⃣ Fetch booking
        const booking = await tx.booking.findUnique({
          where: { id: booking_id },
          include: { place: true },
        });

        if (!booking) {
          throw new NotFoundError("Booking not found");
        }

        // 2️⃣ Validate status
        if (!["INITIAL", "ACTIVE"].includes(booking.status)) {
          throw new BadRequestError("Booking cannot be extended");
        }

        // 3️⃣ Lock place row
        await tx.$executeRawUnsafe(
          `
        SELECT id FROM "places"
        WHERE id = $1 AND is_active = true
        FOR UPDATE
        `,
          booking.place_id
        );

        // 4️⃣ Calculate new end time
        const newEndTime = new Date(
          booking.end_time.getTime() + extraMinutes * 60000
        );

        // 5️⃣ Check overlap (excluding self)
        const conflict = await tx.booking.findFirst({
          where: {
            place_id: booking.place_id,
            id: { not: booking.id },
            status: {
              in: ["INITIAL", "ACTIVE"],
            },
            AND: [
              { start_time: { lt: newEndTime } },
              { end_time: { gt: booking.end_time } },
            ],
          },
        });

        if (conflict) {
          throw new ConflictError(
            "Place not available for extension"
          );
        }

        // 6️⃣ Calculate new duration & price
        const oldDuration =
          booking.actual_duration_minutes;

        const newDuration =
          oldDuration + extraMinutes;

        const totalHours = newDuration / 60

        const newPrice =
          totalHours * Number(booking.price_per_hour);

        // 7️⃣ Audit extension
        await tx.bookingExtension.create({
          data: {
            booking_id: booking.id,
            from_minutes: oldDuration,
            to_minutes: newDuration,
            old_end_time: booking.end_time,
            new_end_time: newEndTime,
            price_before: booking.total_price,
            price_after: newPrice,
          },
        });

        // 8️⃣ Update booking
        const updatedBooking = await tx.booking.update({
          where: { id: booking.id },
          data: {
            end_time: newEndTime,
            actual_duration_minutes: newDuration,
            total_price: newPrice,
          },
        });

        return updatedBooking;
      });

      await bookingActivationQueue.remove(getActivationJobId(result.id))
      await bookingExpirationQueue.remove(getExpirationJobId(result.id))

      await bookingExpirationQueue.add(
        "booking-expiration",
        { booking_id: result.id },
        { delay: (result.end_time.getTime() - Date.now()), jobId: getExpirationJobId(result.id) }
      )

      return resolve(toBookingDTO(result));
    });
}