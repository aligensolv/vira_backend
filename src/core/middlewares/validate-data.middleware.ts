/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../../lib/error_codes";
import { StatusCode } from "../../lib/status_codes";
import { ApiError } from "../../lib/api_error";

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ApiError(
          "Validation failed",
          ErrorCode.VALIDATION_ERROR,
          StatusCode.BAD_REQUEST,
          result.error.flatten().fieldErrors as any
        )
      );
    }

    req.body = result.data;
    next();
  };
