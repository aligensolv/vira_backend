import Redis from "ioredis"
import { redisClient } from "./redis.client"

export class CacheService {
  private readonly redisClient: Redis
  constructor(redisClient: Redis) {
    this.redisClient = redisClient
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key)
    return value ? JSON.parse(value) : null
  }

  async set(key: string, value: unknown, ttlSeconds?: number) {
    const data = JSON.stringify(value)
    if (ttlSeconds) {
      await this.redisClient.set(key, data, "EX", ttlSeconds)
    } else {
      await this.redisClient.set(key, data)
    }
  }

  async del(key: string) {
    await this.redisClient.del(key)
  }
}

export const cache = new CacheService(redisClient)
