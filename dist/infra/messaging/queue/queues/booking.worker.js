"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingExpirationWorker = exports.bookingExpirationProcessor = exports.bookingActivationWorker = exports.bookingActivationProcessor = void 0;
const worker_factory_1 = require("../workers/worker.factory");
const bookingActivationProcessor = async (job) => {
    return false;
};
exports.bookingActivationProcessor = bookingActivationProcessor;
exports.bookingActivationWorker = (0, worker_factory_1.createWorker)('booking-activation', exports.bookingActivationProcessor);
const bookingExpirationProcessor = async (job) => {
    const { booking_id } = job.data;
    return false;
};
exports.bookingExpirationProcessor = bookingExpirationProcessor;
exports.bookingExpirationWorker = (0, worker_factory_1.createWorker)('booking-expiration', exports.bookingExpirationProcessor);
