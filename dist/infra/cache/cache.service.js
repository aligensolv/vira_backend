"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.CacheService = void 0;
const redis_client_1 = require("./redis.client");
class CacheService {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async get(key) {
        const value = await this.redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }
    async set(key, value, ttlSeconds) {
        const data = JSON.stringify(value);
        if (ttlSeconds) {
            await this.redisClient.set(key, data, "EX", ttlSeconds);
        }
        else {
            await this.redisClient.set(key, data);
        }
    }
    async del(key) {
        await this.redisClient.del(key);
    }
}
exports.CacheService = CacheService;
exports.cache = new CacheService(redis_client_1.redisClient);
