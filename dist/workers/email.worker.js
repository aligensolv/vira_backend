"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_factory_1 = require("../core/utils/worker.factory");
// Define the processor function
const processor = async (job) => {
    const { to, subject, body } = job.data;
    console.log(`[EmailWorker] Sending email to: ${to}, ${subject}, ${body}`);
    // Call your email sending service here (e.g., nodemailer or SendGrid)
    // service calling
    return true;
};
// Create the worker
(0, worker_factory_1.createWorker)("emails", processor);
