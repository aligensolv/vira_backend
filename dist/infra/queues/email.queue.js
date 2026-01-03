"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailJob = void 0;
// src/queues/email.queue.ts
const bullmq_1 = require("bullmq");
const redis_config_1 = __importDefault(require("../cache/redis.config"));
const emailQueue = new bullmq_1.Queue("emails", redis_config_1.default);
const sendEmailJob = async (data) => {
    await emailQueue.add("send-email", data);
};
exports.sendEmailJob = sendEmailJob;
emailQueue.upsertJobScheduler('my-sc-id', {
    every: 1000
});
