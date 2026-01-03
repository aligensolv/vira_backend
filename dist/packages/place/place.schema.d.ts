import { z } from "zod";
export declare const createPlaceSchema: z.ZodObject<{
    name: z.ZodString;
    price_per_hour: z.ZodNumber;
    min_duration_minutes: z.ZodNumber;
    is_active: z.ZodOptional<z.ZodBoolean>;
    region_id: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const updatePlaceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    price_per_hour: z.ZodOptional<z.ZodNumber>;
    min_duration_minutes: z.ZodOptional<z.ZodNumber>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    region_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
