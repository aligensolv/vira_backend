import { Job, Worker } from "bullmq";
export declare function createWorker<TData = unknown, TReturnValue = unknown>(queueName: string, processor: (job: Job<TData, TReturnValue, string>) => Promise<TReturnValue>): Worker<TData, TReturnValue, string>;
