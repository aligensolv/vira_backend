import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../lib/api_error";

export const validateSchema =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ValidationError(
          result.error.flatten().fieldErrors,
          "Schema Validation Failed"
        )
      );
    }

    req.body = result.data;
    next();
  };
