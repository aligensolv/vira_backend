// src/utils/auth/jwt.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { securityConfig } from "../../config/server_configs";
import { User } from "@prisma/client";

export function generateJwtToken(payload: object, expiresIn: string | number = securityConfig.jwtExpiresIn) {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, securityConfig.jwtSecret, options);
}

export function generateAccessToken(user: User) {
  const access_token = generateJwtToken({
    id: user.id,
    role: user.role,
    email: user.email
  })

  return access_token
}

export function verifyJwtToken<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, securityConfig.jwtSecret) as T;
  } catch {
    return null;
  }
}