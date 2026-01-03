"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./core/prisma/client");
const createBookingScheduledJob = async (booking, type) => {
    const job = await client_1.prisma.scheduledJob.create({
        data: {
            entity_id: booking.id,
            type: "booking",
            run_at: booking.end_time,
            payload: JSON.stringify(booking),
            version: 1
        }
    });
};
