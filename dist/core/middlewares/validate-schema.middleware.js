"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const api_error_1 = require("../../lib/api_error");
const validateSchema = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new api_error_1.ValidationError(result.error.flatten().fieldErrors, "Schema Validation Failed"));
    }
    req.body = result.data;
    next();
};
exports.validateSchema = validateSchema;
