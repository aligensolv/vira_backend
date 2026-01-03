"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    place_id: zod_1.z.number(),
    start_time: zod_1.z.date(),
    requested_duration_minutes: zod_1.z.number()
});
