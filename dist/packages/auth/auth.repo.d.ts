import { Prisma } from "@prisma/client";
export declare class AuthRepository {
    findUserByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    } | null>;
    findUserById(id: number): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    } | null>;
    insert(data: Prisma.UserCreateInput): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
}
