"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueue = createQueue;
const bullmq_1 = require("bullmq");
const redis_config_1 = require("../../../cache/redis.config");
function createQueue(name) {
    return new bullmq_1.Queue(name, { connection: redis_config_1.redisConnectionOptions });
}
