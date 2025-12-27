"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ApiError = exports.DuplicationError = exports.ValidationError = exports.AuthError = void 0;
const error_codes_1 = require("./error_codes");
const status_codes_1 = require("./status_codes");
class ApiError extends Error {
    code;
    status;
    details;
    constructor(message, code = error_codes_1.ErrorCode.INTERNAL_SERVER_ERROR, status = status_codes_1.StatusCode.INTERNAL_SERVER, details = []) {
        super(message);
        this.code = code;
        this.status = status;
        this.details = details;
    }
}
exports.ApiError = ApiError;
class ValidationError extends ApiError {
    constructor(details = []) {
        super("Validation failed", error_codes_1.ErrorCode.VALIDATION_ERROR, status_codes_1.StatusCode.BAD_REQUEST, details);
    }
}
exports.ValidationError = ValidationError;
class AuthError extends ApiError {
    constructor(message = "Unauthorized") {
        super(message, error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED);
    }
}
exports.AuthError = AuthError;
class DuplicationError extends ApiError {
    constructor(message = "Data is duplicated") {
        super(message, error_codes_1.ErrorCode.DUPLICATION_ERROR, status_codes_1.StatusCode.ALREADY_EXISTS);
    }
}
exports.DuplicationError = DuplicationError;
class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super(message, error_codes_1.ErrorCode.BAD_REQUEST, status_codes_1.StatusCode.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
