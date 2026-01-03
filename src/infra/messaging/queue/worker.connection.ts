import { WorkerOptions } from "bullmq"
import { redisConnectionOptions } from "../../cache/redis.config"

export const workerOptions: WorkerOptions = {
  connection: redisConnectionOptions,
  concurrency: 100
}