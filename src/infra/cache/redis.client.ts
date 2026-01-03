import Redis from "ioredis"
import { redisConnectionOptions } from "./redis.config"


export const redisClient = new Redis(redisConnectionOptions)

export const redisPub = redisClient.duplicate()
export const redisSub = redisClient.duplicate()

export async function shutdownRedis() {
  await Promise.all([
    redisClient.quit(),
    redisPub.quit(),
    redisSub.quit()
  ])
}
