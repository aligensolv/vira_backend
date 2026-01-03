"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerConnection = void 0;
const redis_config_1 = require("../cache/redis.config");
exports.workerConnection = {
    connection: redis_config_1.redisConnectionOptions,
    concurrency: 100
};
