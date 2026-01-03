"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchedulerJob = registerSchedulerJob;
const scheduler_queue_js_1 = require("../messaging/queues/scheduler.queue.js");
async function registerSchedulerJob() {
    await scheduler_queue_js_1.schedulerQueue.upsertJobScheduler("DISCOVER_DUE_JOBS", { every: 5000 });
    console.log("🔁 Scheduler repeatable job registered");
}
