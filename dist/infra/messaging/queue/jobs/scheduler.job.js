"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchedulerJob = registerSchedulerJob;
exports.stopSchedulerJob = stopSchedulerJob;
const scheduler_queue_1 = require("../queues/scheduler.queue");
async function registerSchedulerJob() {
    await scheduler_queue_1.schedulerQueue.upsertJobScheduler("DISCOVER_DUE_JOBS", { every: 5000 });
}
async function stopSchedulerJob() {
    await scheduler_queue_1.schedulerQueue.removeJobScheduler("DISCOVER_DUE_JOBS");
}
