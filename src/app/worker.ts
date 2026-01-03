import { createBookingWorkers } from "../infra/messaging/queue/workers/booking.worker"

async function startWorkers() {
    createBookingWorkers()
}

startWorkers()

async function shutdown() {
  console.log("🛑 Shutting down workers...")

  process.exit(0)
}

["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
  process.on(signal, shutdown)
})