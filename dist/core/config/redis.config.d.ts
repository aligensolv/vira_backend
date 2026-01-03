import IORedis from 'ioredis';
declare const redisConfig: {
    connection: IORedis;
    concurrency: number;
};
export default redisConfig;
