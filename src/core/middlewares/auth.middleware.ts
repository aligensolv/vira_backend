import { NextFunction, Request, Response } from "express"
import { AuthError } from "../../lib/api_error"
import { verifyJwtToken } from "../utils/auth/jwt"
import { JwtPayload } from "jsonwebtoken"
import { getAuthCookie } from "../utils/auth/cookie"
import { UserRole } from "@prisma/client"


export interface TokenPayload extends JwtPayload {
    id: number
    role: UserRole
    email: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.headers.authorization
    
  if (!token) return next(new AuthError("Unauthorized"))

  try {
    const payload: TokenPayload | null = verifyJwtToken<TokenPayload>(token)
    console.log(payload);
    
    if (!payload) {
        throw new AuthError("Unauthorized")
    }


    req.user_id = payload.id
    req.user_role = payload.role

    next()
  } catch {
    next(new AuthError("Unauthorized"))
  }
}

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    if (!allowedRoles.includes(req.user_role)) {
      return next(new AuthError("Not Authorized"))
    }
    next()
  }
}
