import { Prisma } from "@prisma/client";
export declare class ManagerRepository {
    findMany(filter?: Prisma.UserWhereInput): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }[]>;
    findUnique(filter: Prisma.UserWhereUniqueInput): Promise<{
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
    deleteById(id: number): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
    updateById(id: number, data: Prisma.UserUpdateInput): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
}
