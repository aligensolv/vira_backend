import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
export declare function generateJwtToken(payload: object, expiresIn?: string | number): string;
export declare function generateAccessToken(user: User): string;
export declare function verifyJwtToken<T = JwtPayload>(token: string): T | null;
