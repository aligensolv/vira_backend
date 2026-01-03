import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class PlaceRepository {
    async findMany(filter?: Prisma.PlaceWhereInput) {
        return prisma.place.findMany({
            where: filter,
            include: {
                region: true
            }
        });
    }

    async findById(id: number) {
        return prisma.place.findUnique({ where: { id } });
    }

    async findOne(filter: Prisma.PlaceWhereInput) {
        return prisma.place.findFirst({ where: filter });
    }

    async exists(filter: Prisma.PlaceWhereInput) {
        const count = await prisma.place.count({ where: filter });
        return count > 0;
    }

    async count(filter: Prisma.PlaceWhereInput) {
        const count = await prisma.place.count({ where: filter });
        return count;
    }

    async insert(data: Prisma.PlaceCreateInput) {
        return prisma.place.create({
            data,
            include: {
                region: true
            }
        });
    }

    async updateById(id: number, data: Prisma.PlaceUpdateInput) {
        return prisma.place.update({
            where: { id }, 
            data,
            include: {
                region: true
            }
        });
    }

    async updateMany(filter: Prisma.PlaceWhereInput, data: Prisma.PlaceUpdateInput) {
        return prisma.place.updateMany({ where: filter, data });
    }

    async removeById(id: number) {
        return prisma.place.delete({
            where: { id },
            include: {
                region: true
            }
        });
    }

    async removeMany(filter: Prisma.PlaceWhereInput) {
        return prisma.place.deleteMany({ where: filter });
    }

    async search (filter?: Prisma.RegionWhereInput) {
        return await prisma.region.findFirst({ where: filter });
    }
}
