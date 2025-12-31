import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user_id: number
      user_role: UserRole
    }
  }
}

export {};

