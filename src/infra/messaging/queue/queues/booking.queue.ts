import { createQueue } from "./queue.factory";

export type BookingJob = {
  booking_id: number
}

export const bookingActivationQueue = createQueue<BookingJob>('booking-activation')
export const bookingExpirationQueue = createQueue<BookingJob>('booking-expiration')

export const getActivationJobId = (booking_id: number) => `booking:${booking_id}:activate`;
export const getExpirationJobId = (booking_id: number) => `booking:${booking_id}:expire`;