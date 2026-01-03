import type { User } from "@prisma/client";
import type { UserDTO } from "./auth.dto";
export declare function toUserDTO(entity: User): UserDTO;
