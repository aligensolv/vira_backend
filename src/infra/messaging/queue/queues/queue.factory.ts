import { Queue } from "bullmq"
import { redisConnectionOptions } from "../../../cache/redis.config"

export function createQueue<T>(name: string): Queue {
  return new Queue<T>(name, { connection: redisConnectionOptions })
}