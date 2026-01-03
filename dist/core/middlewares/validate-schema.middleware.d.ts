import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
export declare const validateSchema: <T>(schema: ZodSchema<T>) => (req: Request, _res: Response, next: NextFunction) => void;
