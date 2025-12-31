"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_codes_1 = require("../../lib/error_codes");
function errorHandler(err, req, res, next) {
    // Default to 500 if no status code is set
    const status = err.status || 500;
    const response = {
        success: false,
        status: err.status,
        error: {
            message: err.message || "Internal server error",
            code: err.code || error_codes_1.ErrorCode.INTERNAL_SERVER_ERROR,
            ...(err.errors && { errors: err.errors }), // Only include if present
        },
    };
    res.status(status).json(response);
}
exports.default = errorHandler;
