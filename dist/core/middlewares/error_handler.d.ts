import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../lib/api_error";
declare function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction): void;
export default errorHandler;
