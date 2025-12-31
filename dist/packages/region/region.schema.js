"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegionSchema = exports.createRegionSchema = void 0;
const zod_1 = require("zod");
exports.createRegionSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required").min(1, "Name must be at least 1 character long"),
});
exports.updateRegionSchema = zod_1.z.object({
    name: zod_1.z.optional(zod_1.z.string().min(1, "Name must be at least 1 character long"))
});
