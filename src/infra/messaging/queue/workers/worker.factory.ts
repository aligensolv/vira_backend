import { Job, Worker } from "bullmq";
import { workerOptions } from "../worker.connection";

export function createWorker<TData = unknown, TReturnValue = unknown>(
    queueName: string,
    processor: (job: Job<TData, TReturnValue, string>) => Promise<TReturnValue>
) {
    const worker = new Worker<TData, TReturnValue, string>(
        queueName,
        async (job) => {
            try {
                return await processor(job);
            } catch (err) {
                console.error(`[${queueName}] Job failed`, err);
                throw err;
            }
        },
        workerOptions
    );  

    worker.waitUntilReady()
        .then(() => console.log(`✅ Worker for '${queueName}' is ready`))
        .catch((err) => {
            console.error(`❌ Worker for '${queueName}' failed to start`, err);
            process.exit(1);
        });

    worker.on("completed", (job) => {
        console.log(`[${queueName}] Job completed:`, job.id);
    });

    worker.on("failed", (job, err) => {
        console.error(`[${queueName}] Job failed:`, job?.id, err);
    });

    return worker;
}
