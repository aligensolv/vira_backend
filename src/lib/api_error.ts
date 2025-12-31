/* eslint-disable @typescript-eslint/no-explicit-any */
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

class ApiError extends Error {
  code: ErrorCodeType;
  status: StatusCodeType;
  errors: any;

  constructor(options: ApiErrorOptions = {}) {
    super(options.message ?? "Internal Server Error");
    this.code = options.code ?? ErrorCode.INTERNAL_SERVER_ERROR;
    this.status = options.status ?? StatusCode.INTERNAL_SERVER_ERROR;
    this.errors = options.errors ?? [];
  }
}

class ValidationError extends ApiError {
  constructor(errors: any = []) {
    super({ 
      message: "Validation failed",
      code: ErrorCode.VALIDATION_ERROR,
      status: StatusCode.BAD_REQUEST,
      errors
    });
  }
}

class AuthError extends ApiError {
  constructor(message = "Unauthorized") {
    super({ 
      message,
      code: ErrorCode.AUTH_ERROR,
      status: StatusCode.NOT_AUTHORIZED
    });
  }
}

class DuplicationError extends ApiError {
  constructor(message = "Data is duplicated") {
    super({
      message,
      code: ErrorCode.DUPLICATION_ERROR,
      status: StatusCode.CONFLICT
    });
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super({
      message,
      code: ErrorCode.BAD_REQUEST,
      status: StatusCode.BAD_REQUEST
    });
  }
}

class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super({
      message,
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      status: StatusCode.INTERNAL_SERVER_ERROR
    });
  }
}

export {
    AuthError,
    ValidationError,
    DuplicationError,
    ApiError,
    BadRequestError,
    InternalServerError
}
