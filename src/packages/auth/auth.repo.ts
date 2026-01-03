import { Prisma } from "@prisma/client";
import { prisma } from "../../core/prisma/client";

export class AuthRepository {
    async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async findUserById(id: number) {
        return prisma.user.findUnique({
            where: { id }
        });
    }


    async insert(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }
}
