"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const api_error_1 = require("../../lib/api_error");
const validateData = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new api_error_1.ValidationError(result.error.flatten().fieldErrors));
    }
    req.body = result.data;
    next();
};
exports.validateData = validateData;
