import { z } from "zod";
export declare const createManagerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    password_confirmation: z.ZodString;
}, z.core.$strip>;
export declare const updateManagerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodOptional<z.ZodString>;
    password_confirmation: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
