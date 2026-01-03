import  { RedisOptions } from 'ioredis';

export const redisConnectionOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
}