import { Prisma } from "@prisma/client";
export declare class UserRepository {
    findMany(filter?: Prisma.UserWhereInput): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }[]>;
}
