"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const error_codes_1 = require("../../lib/error_codes");
const status_codes_1 = require("../../lib/status_codes");
const api_error_1 = require("../../lib/api_error");
const validateBody = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new api_error_1.ApiError("Validation failed", error_codes_1.ErrorCode.VALIDATION_ERROR, status_codes_1.StatusCode.BAD_REQUEST, result.error.flatten().fieldErrors));
    }
    req.body = result.data;
    next();
};
exports.validateBody = validateBody;
