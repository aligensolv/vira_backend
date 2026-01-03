"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingWorkers = exports.bookingExpirationProcessor = exports.bookingActivationProcessor = void 0;
const worker_factory_1 = require("./worker.factory");
const client_1 = require("../../../../core/prisma/client");
const pubsub_1 = require("../../pubsub");
const bookingActivationProcessor = async (job) => {
    const { booking_id } = job.data;
    const booking = await client_1.prisma.booking.findUnique({
        where: { id: booking_id }
    });
    if (!booking || booking.status == "CANCELLED")
        return;
    await client_1.prisma.booking.update({
        where: {
            id: booking_id
        },
        data: {
            status: 'ACTIVE'
        }
    });
    await pubsub_1.pubsub.publish('booking:updated', { id: booking_id });
    return false;
};
exports.bookingActivationProcessor = bookingActivationProcessor;
const bookingExpirationProcessor = async (job) => {
    const { booking_id } = job.data;
    const booking = await client_1.prisma.booking.findUnique({
        where: { id: booking_id }
    });
    if (!booking || booking.status == "CANCELLED")
        return;
    await client_1.prisma.booking.update({
        where: {
            id: booking_id
        },
        data: {
            status: 'COMPLETED'
        }
    });
    await pubsub_1.pubsub.publish('booking:updated', { id: booking_id });
    return false;
};
exports.bookingExpirationProcessor = bookingExpirationProcessor;
const createBookingWorkers = () => {
    (0, worker_factory_1.createWorker)('booking-activation', exports.bookingActivationProcessor);
    (0, worker_factory_1.createWorker)('booking-expiration', exports.bookingExpirationProcessor);
};
exports.createBookingWorkers = createBookingWorkers;
