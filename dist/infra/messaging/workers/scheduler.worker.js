"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSchedulerWorker = startSchedulerWorker;
const bullmq_1 = require("bullmq");
const redis_config_1 = __importDefault(require("../cache/redis.config"));
async function startSchedulerWorker() {
    const worker = new bullmq_1.Worker("scheduler", async () => {
        console.log("🕒 BullMQ scheduler tick");
        await runSchedulerTick();
    }, {
        connection: redis_config_1.default.connection,
        concurrency: 1,
    });
    return worker;
}
async function runSchedulerTick() {
}
