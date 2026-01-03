"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_config_1 = __importDefault(require("../core/config/redis.config"));
const scheduler_queue_1 = require("../queues/scheduler.queue");
exports.schedulerWorker = new bullmq_1.Worker("scheduler", async () => {
    console.log("BullMQ scheduler tick");
    await runSchedulerTick();
}, {
    connection: redis_config_1.default.connection,
    concurrency: 1
});
async function runSchedulerTick() {
    console.log('running tick');
}
process.on("SIGTERM", async () => {
    console.log("Closing workers...");
    await exports.schedulerWorker.close();
    await scheduler_queue_1.schedulerQueue.close();
    //   await redis.quit()
    process.exit(0);
});
