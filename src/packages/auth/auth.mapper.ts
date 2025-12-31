import type { User } from "@prisma/client";
import type { UserDTO } from "./auth.dto";

export function toUserDTO(entity: User): UserDTO {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,

    created_at: entity.created_at,
    updated_at: entity.updated_at,
  };
}
