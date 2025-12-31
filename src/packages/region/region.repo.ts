import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class RegionRepository {
    async findMany(filter?: Prisma.RegionWhereInput) {
        return prisma.region.findMany({ where: filter });
    }

    async findById(id: number) {
        return prisma.region.findUnique({ where: { id } });
    }

    async insert(data: Prisma.RegionCreateInput) {
        return prisma.region.create({ data });
    }

    async updateById(id: number, data: Prisma.RegionUpdateInput) {
        return prisma.region.update({ where: { id }, data });
    }


    async removeById(id: number) {
        return prisma.region.delete({ where: { id } });
    }

    async exists(id: number) {
        const region = await this.findById(id)

        return !!region
    }

    async search (filter?: Prisma.RegionWhereInput) {
        return await prisma.region.findFirst({ where: filter });
    }
}
