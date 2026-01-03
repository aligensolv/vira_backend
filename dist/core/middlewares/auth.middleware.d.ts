import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
export interface TokenPayload extends JwtPayload {
    id: number;
    role: UserRole;
    email: number;
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const authorizeRoles: (...allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
