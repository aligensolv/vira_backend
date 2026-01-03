import { Request, Response } from "express";
export declare function setAuthCookie(res: Response, token: string): Response<any, Record<string, any>>;
export declare function clearAuthCookie(res: Response): Response<any, Record<string, any>>;
export declare function getAuthCookie(req: Request): any;
