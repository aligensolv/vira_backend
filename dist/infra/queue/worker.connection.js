"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerOptions = void 0;
const redis_config_1 = require("../cache/redis.config");
exports.workerOptions = {
    connection: redis_config_1.redisConnectionOptions,
    concurrency: 100
};
