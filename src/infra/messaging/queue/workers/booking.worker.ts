import { Job } from 'bullmq'
import { createWorker } from './worker.factory'
import { BookingJob } from '../queues/booking.queue'
import { prisma } from '../../../../core/prisma/client'
import { pubsub } from '../../pubsub'



export const bookingActivationProcessor = async (job: Job<BookingJob>) => {
    const { booking_id } = job.data

    const booking = await prisma.booking.findUnique({
        where: { id: booking_id }
    });

    if (!booking || booking.status == "CANCELLED") return;

    await prisma.booking.update({
        where: {
            id: booking_id
        },
        data: {
            status: 'ACTIVE'
        }
    })

    await pubsub.publish('booking:updated', { id: booking_id })

    return false
}

export const bookingExpirationProcessor = async (job: Job<BookingJob>) => {
    const { booking_id } = job.data

    const booking = await prisma.booking.findUnique({
        where: { id: booking_id }
    });

    if (!booking || booking.status == "CANCELLED") return;

    await prisma.booking.update({
        where: {
            id: booking_id
        },
        data: {
            status: 'COMPLETED'
        }
    })

    await pubsub.publish('booking:updated', { id: booking_id })


    return false
}


export const createBookingWorkers = () => {
    createWorker<BookingJob>('booking-activation', bookingActivationProcessor)
    createWorker<BookingJob>('booking-expiration', bookingExpirationProcessor)
}