"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaceSchema = exports.createPlaceSchema = void 0;
const zod_1 = require("zod");
exports.createPlaceSchema = zod_1.z.object({
    name: zod_1.z
        .string("Name is required")
        .min(2, "Name must be at least 2 characters long"),
    price_per_hour: zod_1.z.number({
        error: (iss) => {
            if (iss.input == undefined) {
                return { message: "Price per hour is required" };
            }
            return { message: "Invalid input: Please enter a valid number" };
        },
    })
        .min(0, "Price per hour must be non-negative"),
    min_duration_minutes: zod_1.z.number({
        error: (iss) => {
            if (iss.input == undefined) {
                return { message: "Minimum duration is required" };
            }
            return { message: "Invalid input: Please enter a valid number" };
        }
    }).min(10, "Minimum duration must be at least 10 minutes"),
    is_active: zod_1.z.boolean().optional(),
    region_id: zod_1.z.number().optional().nullable(),
});
exports.updatePlaceSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").optional(),
    price_per_hour: zod_1.z.number().min(0, "Price per hour must be non-negative").optional(),
    min_duration_minutes: zod_1.z.number().min(15, "Minimum duration must be at least 15 minutes").optional(),
    is_active: zod_1.z.boolean().optional(),
    region_id: zod_1.z.number().nullable().optional(),
});
