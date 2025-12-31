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

}
