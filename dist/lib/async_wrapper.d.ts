import { NextFunction, Request, Response } from "express";
type AsyncWrapperType = (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const asyncWrapper: (fn: AsyncWrapperType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncWrapper;
