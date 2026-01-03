import { z } from "zod";
export declare const createRegionSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const updateRegionSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
