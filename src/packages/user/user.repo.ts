import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class UserRepository {
    async findMany(filter?: Prisma.UserWhereInput) {
        return prisma.user.findMany({ where: filter });
    }
}