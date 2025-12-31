import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string("Email is required"),
  password: z.string("Password is required")
});

export const registerUserSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(3, { message: "Email must be at least 3 characters long" }),

  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
})
