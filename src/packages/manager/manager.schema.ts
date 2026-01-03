import { z } from "zod"

export const createManagerSchema = z.object({
    name: z.string("name field is required").min(1, "name field must be at least 1 characters long"),
    email: z.email("email field is not a valid email"),
    password: z.string("password field is required").min(6, "Password must be at least 6 characters long"),
    password_confirmation: z.string("password_confirmation is required").min(6, "password_confirmation field must be at least 6 characters long")
}).refine((data) => data.password === data.password_confirmation, {
    message: "password field and password_confirmation field must match",
    path: ['password_confirmation']
})


export const updateManagerSchema = z.object({
    name: z.string().min(1, "name field must be at least 1 characters long").optional(),
    email: z.email("email field is not a valid email").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    password_confirmation: z.string().min(6, "password_confirmation field must be at least 6 characters long").optional()
}).refine((data) => {
    if (!data.password && !data.password_confirmation) return true;
    return data.password === data.password_confirmation;
}, {
    message: "password field and password_confirmation field must match",
    path: ['password_confirmation']
})
