"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerExecutorQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_config_1 = require("../cache/redis.config");
exports.schedulerExecutorQueue = new bullmq_1.Queue('scheduler-executer', {
    connection: redis_config_1.redisConnectionOptions
});
