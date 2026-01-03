import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class ManagerRepository {
    async findMany(filter?: Prisma.UserWhereInput) {
        return prisma.user.findMany({
            where: {
                ...filter,
                OR: [
                    {
                        role: 'ADMIN'
                    },

                    {
                        role: 'SUPER_ADMIN'
                    }
                ]
            }
        });
    }

    async findUnique(filter: Prisma.UserWhereUniqueInput) {
        return prisma.user.findUnique({ where: filter });
    }

    async insert(data: Prisma.UserCreateInput) {
        return prisma.user.create({ data });
    }

    async deleteById(id: number) {
        return prisma.user.delete({ where: { id } });
    }

    async updateById(id: number, data: Prisma.UserUpdateInput) {
        return prisma.user.update({ where: { id }, data });
    }

}
