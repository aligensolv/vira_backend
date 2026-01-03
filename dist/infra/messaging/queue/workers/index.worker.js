"use strict";
// // src/workers/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const redis_config_1 = require("../../cache/redis.config");
// import { startSchedulerWorker } from "./scheduler.worker"
// async function startWorkers() {
//   startSchedulerWorker()
// }
// startWorkers()
// async function shutdown() {
//   console.log("🛑 Shutting down workers...")
//   process.exit(0)
// }
// ["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
//   process.on(signal, shutdown)
// })
redis_config_1.redis.publish('booking-events', "test message");
