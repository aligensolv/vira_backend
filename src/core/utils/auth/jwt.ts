// src/utils/auth/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { securityConfig } from "../../config/server_configs";

export function generateToken(payload: object, expiresIn: string | number = securityConfig.jwtExpiresIn) {
  return jwt.sign(payload, securityConfig.jwtSecret as string, { expiresIn });
}

export function verifyToken<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, securityConfig.jwtSecret) as T;
  } catch {
    return null;
  }
}

export function decodeToken<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch {
    return null;
  }
}
