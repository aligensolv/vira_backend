"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingExecutorWorker = void 0;
const redis_config_1 = require("../../cache/redis.config");
const bullmq_1 = require("bullmq");
const redis_config_2 = __importDefault(require("../../cache/redis.config"));
const processor = async (job) => {
    redis_config_1.redis.publish('booking-events', '{}');
    return true;
};
exports.bookingExecutorWorker = new bullmq_1.Worker("booking-executor", processor, redis_config_2.default);
