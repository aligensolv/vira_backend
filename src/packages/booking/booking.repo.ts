import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class BookingRepository {
    async findMany(filter?: Prisma.BookingWhereInput) {
        return prisma.booking.findMany({
            where: filter,
            include: {
                user: true,
                extensions: true,
                place: {
                    include: {
                        region: true
                    }
                },
                payment: true
            }
        });
    }

    async findById(id: number) {
        return prisma.booking.findUnique({
            where: { id },
            include: {
                user: true,
                payment: true,
                place: {
                    include: {
                        region: true
                    }
                },
                extensions: true
            }
        });
    }

    async findOne(filter: Prisma.BookingWhereInput) {
        return prisma.booking.findFirst({ where: filter });
    }

    async exists(filter: Prisma.BookingWhereInput) {
        const count = await prisma.booking.count({ where: filter });
        return count > 0;
    }

    async insert(data: Prisma.BookingCreateInput) {
        return prisma.booking.create({ data });
    }

    async updateById(id: number, data: Prisma.BookingUpdateInput) {
        return prisma.booking.update({ where: { id }, data });
    }

    async updateMany(filter: Prisma.BookingWhereInput, data: Prisma.BookingUpdateInput) {
        return prisma.booking.updateMany({ where: filter, data });
    }

    async removeById(id: number) {
        return prisma.booking.delete({ where: { id } });
    }

    async removeMany(filter: Prisma.BookingWhereInput) {
        return prisma.booking.deleteMany({ where: filter });
    }
}
