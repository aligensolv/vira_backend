"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.ApiError = exports.DuplicationError = exports.ValidationError = exports.AuthError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const error_codes_1 = require("./error_codes");
const status_codes_1 = require("./status_codes");
class ApiError extends Error {
    code;
    status;
    errors;
    constructor(options = {}) {
        super(options.message ?? "Internal Server Error");
        this.code = options.code ?? error_codes_1.ErrorCode.INTERNAL_SERVER_ERROR;
        this.status = options.status ?? status_codes_1.StatusCode.INTERNAL_SERVER_ERROR;
        this.errors = options.errors ?? [];
    }
}
exports.ApiError = ApiError;
class ValidationError extends ApiError {
    constructor(errors = []) {
        super({
            message: "Validation failed",
            code: error_codes_1.ErrorCode.VALIDATION_ERROR,
            status: status_codes_1.StatusCode.BAD_REQUEST,
            errors
        });
    }
}
exports.ValidationError = ValidationError;
class AuthError extends ApiError {
    constructor(message = "Unauthorized") {
        super({
            message,
            code: error_codes_1.ErrorCode.AUTH_ERROR,
            status: status_codes_1.StatusCode.NOT_AUTHORIZED
        });
    }
}
exports.AuthError = AuthError;
class DuplicationError extends ApiError {
    constructor(message = "Data is duplicated") {
        super({
            message,
            code: error_codes_1.ErrorCode.DUPLICATION_ERROR,
            status: status_codes_1.StatusCode.CONFLICT
        });
    }
}
exports.DuplicationError = DuplicationError;
class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super({
            message,
            code: error_codes_1.ErrorCode.BAD_REQUEST,
            status: status_codes_1.StatusCode.BAD_REQUEST
        });
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends ApiError {
    constructor(message = "Internal Server Error") {
        super({
            message,
            code: error_codes_1.ErrorCode.INTERNAL_SERVER_ERROR,
            status: status_codes_1.StatusCode.INTERNAL_SERVER_ERROR
        });
    }
}
exports.InternalServerError = InternalServerError;
