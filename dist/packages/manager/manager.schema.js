"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManagerSchema = exports.createManagerSchema = void 0;
const zod_1 = require("zod");
exports.createManagerSchema = zod_1.z.object({
    name: zod_1.z.string("name field is required").min(1, "name field must be at least 1 characters long"),
    email: zod_1.z.email("email field is not a valid email"),
    password: zod_1.z.string("password field is required").min(6, "Password must be at least 6 characters long"),
    password_confirmation: zod_1.z.string("password_confirmation is required").min(6, "password_confirmation field must be at least 6 characters long")
}).refine((data) => data.password === data.password_confirmation, {
    message: "password field and password_confirmation field must match",
    path: ['password_confirmation']
});
exports.updateManagerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "name field must be at least 1 characters long").optional(),
    email: zod_1.z.email("email field is not a valid email").optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long").optional(),
    password_confirmation: zod_1.z.string().min(6, "password_confirmation field must be at least 6 characters long").optional()
}).refine((data) => {
    if (!data.password && !data.password_confirmation)
        return true;
    return data.password === data.password_confirmation;
}, {
    message: "password field and password_confirmation field must match",
    path: ['password_confirmation']
});
