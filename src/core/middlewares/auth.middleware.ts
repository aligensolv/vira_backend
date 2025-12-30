import { NextFunction, Request, Response } from "express"
import { ErrorCode } from "../../lib/error_codes"
import { StatusCode } from "../../lib/status_codes"
import { ApiError } from "../../lib/api_error"
import { verifyToken } from "../utils/auth/jwt"
import { User } from "@prisma/client"
import { prisma } from "../prisma/client"
import { JwtPayload } from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: User
}

export interface TokenPayload extends JwtPayload {
    user_id: number,
    role: string

}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  if (!token) return next(new ApiError("Unauthorized", ErrorCode.AUTH_ERROR, StatusCode.NOT_AUTHORIZED))

  try {
    const payload: TokenPayload | null = verifyToken<TokenPayload>(token)
    if (!payload) {
        throw new ApiError("Unauthorized", ErrorCode.AUTH_ERROR, StatusCode.NOT_AUTHORIZED)
    }


    const user = await prisma.user.findUnique({ where: { id: payload.user_id } })
    if (!user) {
        throw new ApiError("Unauthorized", ErrorCode.AUTH_ERROR, StatusCode.NOT_AUTHORIZED)
    }

    req.user = user
    next()
  } catch {
    next(new ApiError("Unauthorized", ErrorCode.AUTH_ERROR, StatusCode.NOT_AUTHORIZED))
  }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user || !allowedRoles.includes(user.role)) {
      return next(new ApiError("Not Authorized", ErrorCode.AUTH_ERROR, StatusCode.FORBIDDEN))
    }
    next()
  }
}
