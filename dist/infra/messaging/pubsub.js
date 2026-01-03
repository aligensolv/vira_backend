"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const redis_client_1 = require("../cache/redis.client");
class RedisPubSub {
    handlers = new Map();
    initialized = false;
    constructor() {
        this.init();
    }
    init() {
        if (this.initialized)
            return;
        this.initialized = true;
        redis_client_1.redisSub.on("message", (channel, message) => {
            const channelHandlers = this.handlers.get(channel);
            if (!channelHandlers || channelHandlers.size === 0)
                return;
            let parsed;
            try {
                parsed = JSON.parse(message);
            }
            catch (err) {
                console.error("Invalid pubsub message:", err);
                return;
            }
            channelHandlers.forEach(handler => {
                try {
                    handler(parsed);
                }
                catch (err) {
                    console.error("PubSub handler error:", err);
                }
            });
        });
    }
    async publish(channel, payload) {
        return redis_client_1.redisPub.publish(channel, JSON.stringify(payload));
    }
    async subscribe(channel, handler) {
        if (!this.handlers.has(channel)) {
            this.handlers.set(channel, new Set());
            await redis_client_1.redisSub.subscribe(channel);
        }
        this.handlers.get(channel).add(handler);
    }
    async unsubscribe(channel, handler) {
        const handlers = this.handlers.get(channel);
        if (!handlers)
            return;
        handlers.delete(handler);
        if (handlers.size === 0) {
            this.handlers.delete(channel);
            await redis_client_1.redisSub.unsubscribe(channel);
        }
    }
}
exports.pubsub = new RedisPubSub();
