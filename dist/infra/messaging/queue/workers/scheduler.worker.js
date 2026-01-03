"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSchedulerWorker = startSchedulerWorker;
const prisma_connection_1 = require("./prisma.connection");
const worker_factory_1 = require("./worker.factory");
const pubsub_1 = require("../../pubsub");
async function startSchedulerWorker() {
    const worker = (0, worker_factory_1.createWorker)('scheduler', processor);
    return worker;
}
async function processor(job) {
    const { booking_id, action_type } = job.data;
    if (action_type == 'activation') {
        await prisma_connection_1.out_prisma.booking.update({
            where: {
                id: booking_id
            },
            data: {
                status: 'ACTIVE'
            }
        });
    }
    else if (action_type == 'expiration') {
        await prisma_connection_1.out_prisma.booking.update({
            where: {
                id: booking_id
            },
            data: {
                status: 'COMPLETED'
            }
        });
    }
    pubsub_1.pubsub.publish('booking:updated', { id: booking_id });
    return true;
}
