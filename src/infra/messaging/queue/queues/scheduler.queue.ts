import { createQueue } from "./queue.factory";
import { SchedulerJobType } from "../workers/scheduler.worker";

export const schedulerQueue = createQueue<SchedulerJobType>("scheduler");
