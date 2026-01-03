"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_worker_1 = require("../infra/messaging/queue/workers/booking.worker");
async function startWorkers() {
    (0, booking_worker_1.createBookingWorkers)();
}
startWorkers();
async function shutdown() {
    console.log("🛑 Shutting down workers...");
    process.exit(0);
}
["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, shutdown);
});
