import { Booking } from "@prisma/client";
import { prisma } from "./core/prisma/client";

type BookingJobType = "activation" | "expiration"

const createBookingScheduledJob = async (booking: Booking, type: BookingJobType) => {
    const job = await prisma.scheduledJob.create({
        data: {
            entity_id: booking.id,
            type: "booking",
            run_at: booking.end_time,
            payload: JSON.stringify(booking),
            version: 1
        }
    })
}