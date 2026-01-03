import { UserRole } from "@prisma/client"

export type UserDTO = {
  id: number
  name: string
  email: string

  role: UserRole

  created_at: Date
  updated_at: Date
}
