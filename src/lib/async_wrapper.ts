import { NextFunction, Request, Response } from "express";
import { ApiError, InternalServerError } from "./api_error";
import logger from "../core/utils/logger";


type AsyncWrapperType = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncWrapper = (fn: AsyncWrapperType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {            
            if (error instanceof ApiError) {
                logger.error((error as ApiError).message)
                return next(error);
            }

            const custom_error = new InternalServerError((error as Error).message)
            return next(custom_error);
        }
    }
}

export default asyncWrapper

