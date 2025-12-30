"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaceSchema = void 0;
const zod_1 = require("zod");
exports.createPlaceSchema = zod_1.z.object({
    name: zod_1.z
        .string("Name is required")
        .min(2, "Name must be at least 2 characters long"),
    price_per_hour: zod_1.z.number("Price per hour is required").min(0, "Price per hour must be non-negative"),
    min_duration_min: zod_1.z.number("Minimum duration is required").min(15, "Minimum duration must be at least 15 minutes"),
    is_active: zod_1.z.boolean().optional(),
    region_id: zod_1.z.number().optional().nullable(),
});
