"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSub = exports.redisPub = exports.redisClient = void 0;
exports.shutdownRedis = shutdownRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const redis_config_1 = require("./redis.config");
exports.redisClient = new ioredis_1.default(redis_config_1.redisConnectionOptions);
exports.redisPub = exports.redisClient.duplicate();
exports.redisSub = exports.redisClient.duplicate();
async function shutdownRedis() {
    await Promise.all([
        exports.redisClient.quit(),
        exports.redisPub.quit(),
        exports.redisSub.quit()
    ]);
}
