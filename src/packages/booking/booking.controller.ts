import { BookingService } from "./booking.service";
import asyncWrapper from "../../lib/async_wrapper";

export class BookingController {
  private readonly bookingService: BookingService

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService
  }

  public getBookingsHandler = asyncWrapper(
    async (req, res) => {
      const data = await this.bookingService.getAllBookings();
      res.json({ data });
    }
  )
 
  public getUserBookingsHandler = asyncWrapper(
    async (req, res) => {
      const data = await this.bookingService.listUserBookings(req.user_id);
      
      res.json({ data });
    }
  )

  public getSingleBookingHandler = asyncWrapper(
    async (req, res) => {
      const { id } = req.params

      const data = await this.bookingService.getSingleBooking(+id);
      res.json({ data });
    }
  )

  public createBookingHandler = asyncWrapper(
    async (req, res) => {

      const user_id = req.user_id
      const { place_id, start_time, requested_duration_minutes } = req.body

      const data = await this.bookingService.createBooking(user_id, place_id, new Date(start_time), requested_duration_minutes);
      res.json({ data });
    }
  )

  public extendBookingHandler = asyncWrapper(
    async (req, res) => {
      const { id: booking_id } = req.params;
      const { extra_minutes } = req.body;

      const booking = await this.bookingService.extendBooking(+booking_id, extra_minutes);

      res.json({ booking });
    }
  )

  public cancelBookingHandler = asyncWrapper(
    async (req, res) => {
      const { id: booking_id } = req.params;

      const booking = await this.bookingService.cancelBooking(+booking_id);

      res.json({ booking });
    }
  )
}