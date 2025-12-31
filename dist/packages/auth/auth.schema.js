"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = void 0;
const zod_1 = require("zod");
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string("Email is required"),
    password: zod_1.z.string("Password is required")
});
exports.registerUserSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email" })
        .min(3, { message: "Email must be at least 3 characters long" }),
    password: zod_1.z
        .string()
        .min(3, { message: "Password must be at least 3 characters long" })
});
