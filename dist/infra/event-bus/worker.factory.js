"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorker = createWorker;
const bullmq_1 = require("bullmq");
const worker_connection_1 = require("./worker.connection");
function createWorker(queueName, processor) {
    const worker = new bullmq_1.Worker(queueName, async (job) => {
        try {
            return await processor(job);
        }
        catch (err) {
            console.error(`[${queueName}] Job failed`, err);
            throw err;
        }
    }, worker_connection_1.workerOptions);
    worker.waitUntilReady()
        .then(() => console.log(`✅ Worker for '${queueName}' is ready`))
        .catch((err) => {
        console.error(`❌ Worker for '${queueName}' failed to start`, err);
        process.exit(1);
    });
    worker.on("completed", (job) => {
        console.log(`[${queueName}] Job completed:`, job.id);
    });
    worker.on("failed", (job, err) => {
        console.error(`[${queueName}] Job failed:`, job?.id, err);
    });
    return worker;
}
