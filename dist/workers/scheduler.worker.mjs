import { Worker } from "bullmq";
import redisConfig from "../core/config/redis.config.js";
import { schedulerQueue } from "../queues/scheduler.queue.js";
export const schedulerWorker = new Worker("scheduler", async () => {
    console.log("BullMQ scheduler tick");
    await runSchedulerTick();
}, {
    connection: redisConfig.default.connection,
    concurrency: 1
});
async function runSchedulerTick() {
    console.log('running tick');
}
process.on("SIGTERM", async () => {
    console.log("Closing workers...");
    await schedulerWorker.close();
    await schedulerQueue.close();
    //   await redis.quit()
    process.exit(0);
});
