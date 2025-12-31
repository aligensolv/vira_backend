// src/utils/auth/cookies.ts
import { Request, Response } from "express"

export function setAuthCookie(res: Response, token: string) {
  return res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  })
}

export function clearAuthCookie(res: Response) {
  return res.clearCookie("access_token")
}

export function getAuthCookie(req: Request) {
  return req.cookies.access_token
}