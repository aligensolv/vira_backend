/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../lib/api_error";
import { ErrorCode } from "../../lib/error_codes";

function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {

    // Default to 500 if no status code is set
    const status = err.status || 500;
    const response = {
      success: false,
      error: {
        message: err.message || "Internal server error",
        code: err.code || ErrorCode.INTERNAL_SERVER_ERROR,
        status: err.status,
        ...(err.errors && { errors: err.errors }), // Only include if present
      },
    };
    res.status(status).json(response);
}

export default errorHandler