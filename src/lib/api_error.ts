import { ErrorCode } from "./error_codes";
import { StatusCode } from "./status_codes";

type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
type StatusCodeType = (typeof StatusCode)[keyof typeof StatusCode];

class ApiError extends Error {
    code: ErrorCodeType
    status: StatusCodeType
    errors: Array<string>
    constructor(
        message: string,
        code: ErrorCodeType = ErrorCode.INTERNAL_SERVER_ERROR,
        status: StatusCodeType = StatusCode.INTERNAL_SERVER,
        errors: Array<string> = []
    ) {
        super(message);
        this.code = code;
        this.status = status;
        this.errors = errors;
    }
}

class ValidationError extends ApiError {
    constructor(errors = []) {
        super("Validation failed", ErrorCode.VALIDATION_ERROR, StatusCode.BAD_REQUEST, errors);
    }
}

class AuthError extends ApiError {
    constructor(message = "Unauthorized") {
        super(message, ErrorCode.AUTH_ERROR, StatusCode.NOT_AUTHORIZED);
    }
}

class DuplicationError extends ApiError {
    constructor(message = "Data is duplicated") {
        super(message, ErrorCode.DUPLICATION_ERROR, StatusCode.ALREADY_EXISTS);
    }
}

class BadRequestError extends ApiError {
    constructor(message = "Bad Request") {
        super(message, ErrorCode.BAD_REQUEST, StatusCode.BAD_REQUEST);
    }
}



export {
    AuthError,
    ValidationError,
    DuplicationError,
    ApiError,
    BadRequestError
}
