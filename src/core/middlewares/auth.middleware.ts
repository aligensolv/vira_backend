import { NextFunction, Request, Response } from "express"
import { AuthError } from "../../lib/api_error"
import { verifyJwtToken } from "../utils/auth/jwt"
import { prisma } from "../prisma/client"
import { JwtPayload } from "jsonwebtoken"
import { getAuthCookie } from "../utils/auth/cookie"


export interface TokenPayload extends JwtPayload {
    id: number
    role: string
    email: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const client_source = req.headers['x-client-source'] as 'web' | 'mobile-app' | 'dev'
  
    const token = client_source == 'web' ? getAuthCookie(req) : req.headers.authorization
    console.log(token);
    console.log(client_source);
    
  if (!token) return next(new AuthError("Unauthorized"))

  try {
    const payload: TokenPayload | null = verifyJwtToken<TokenPayload>(token)
    console.log(payload);
    
    if (!payload) {
        throw new AuthError("Unauthorized")
    }


    req.user_id = payload.id
    next()
  } catch {
    next(new AuthError("Unauthorized"))
  }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user_id
        }
    })

    if (!user || !allowedRoles.includes(user.role)) {
      return next(new AuthError("Not Authorized"))
    }
    next()
  }
}
