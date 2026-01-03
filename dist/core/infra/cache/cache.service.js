"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_client_1 = require("./redis.client");
exports.cache = {
    async get(key) {
        const value = await redis_client_1.redisClient.get(key);
        return value ? JSON.parse(value) : null;
    },
    async set(key, value, ttlSeconds) {
        const data = JSON.stringify(value);
        if (ttlSeconds) {
            await redis_client_1.redisClient.set(key, data, "EX", ttlSeconds);
        }
        else {
            await redis_client_1.redisClient.set(key, data);
        }
    },
    async del(key) {
        await redis_client_1.redisClient.del(key);
    }
};
