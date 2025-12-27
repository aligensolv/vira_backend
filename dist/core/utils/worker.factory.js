"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorker = createWorker;
const bullmq_1 = require("bullmq");
const redis_config_1 = __importDefault(require("../config/redis.config"));
function createWorker(queueName, processor) {
    const worker = new bullmq_1.Worker(queueName, async (job) => {
        try {
            return await processor(job);
        }
        catch (err) {
            console.error(`[${queueName}] Job failed`, err);
            throw err;
        }
    }, redis_config_1.default);
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
