"use strict";
// import { Job } from "bullmq";
// import { createWorker } from "../core/utils/worker.factory";
// import { prisma } from "../core/prisma/client";
// import { BookingJob } from "../core/interfaces/jobs/booking";
Object.defineProperty(exports, "__esModule", { value: true });
// const processor = async (job: Job<BookingJob>) => {
//   const scheduledJob = await prisma.scheduledJob.findUnique({
//     where: { id: job.id }
//   });
//   if (!scheduledJob || scheduledJob.version !== job.data.version) {
//     return false;
//   }
//   return true;
// };
// createWorker<BookingJob, boolean>("emails", processor);
