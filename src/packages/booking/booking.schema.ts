import { z } from "zod";

export const createBookingSchema = z.object({
    user_id: z.number(),
    place_id: z.number(),
    start_time: z.date(),
    requested_duration_minutes: z.number()
});
