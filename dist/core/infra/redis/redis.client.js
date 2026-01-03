"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSub = exports.redisPub = exports.redisClient = exports.redis = void 0;
const ioredis_1 = require("ioredis");
const ioredis_2 = __importDefault(require("ioredis"));
const redis_config_1 = require("./redis.config");
exports.redis = new ioredis_2.default({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
});
exports.redisClient = new ioredis_1.Redis(redis_config_1.redisConfig);
exports.redisPub = exports.redisClient.duplicate();
exports.redisSub = exports.redisClient.duplicate();
exports.default = exports.redisClient;
