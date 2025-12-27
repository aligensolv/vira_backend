// src/queues/email.queue.ts
import { Queue } from "bullmq";
import redisConfig from "../core/config/redis.config";
import { EmailJob } from "../core/interfaces/jobs/email";

const emailQueue = new Queue<EmailJob>("emails", redisConfig);

export const sendEmailJob = async (data: EmailJob) => {
  await emailQueue.add("send-email", data);
};
