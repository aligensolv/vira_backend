import { ErrorCode } from "./error_codes";
import { StatusCode } from "./status_codes";
type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
type StatusCodeType = (typeof StatusCode)[keyof typeof StatusCode];
interface ApiErrorOptions {
    message?: string;
    code?: ErrorCodeType;
    status?: StatusCodeType;
    errors?: any;
}
declare class ApiError extends Error {
    code: ErrorCodeType;
    status: StatusCodeType;
    errors: any;
    constructor(options?: ApiErrorOptions);
}
declare class ValidationError extends ApiError {
    constructor(errors?: any, message?: string);
}
declare class AuthError extends ApiError {
    constructor(message?: string);
}
declare class ConflictError extends ApiError {
    constructor(message?: string);
}
declare class BadRequestError extends ApiError {
    constructor(message?: string);
}
declare class InternalServerError extends ApiError {
    constructor(message?: string);
}
declare class NotFoundError extends ApiError {
    constructor(message?: string);
}
export { AuthError, ValidationError, ConflictError, ApiError, BadRequestError, InternalServerError, NotFoundError };
