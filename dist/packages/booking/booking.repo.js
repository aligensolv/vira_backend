"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const client_1 = require("../../core/prisma/client");
class BookingRepository {
    async findMany(filter) {
        return client_1.prisma.booking.findMany({ where: filter });
    }
    async findById(id) {
        return client_1.prisma.booking.findUnique({
            where: { id },
            include: {
                user: true
            }
        });
    }
    async findOne(filter) {
        return client_1.prisma.booking.findFirst({ where: filter });
    }
    async exists(filter) {
        const count = await client_1.prisma.booking.count({ where: filter });
        return count > 0;
    }
    async insert(data) {
        return client_1.prisma.booking.create({ data });
    }
    async updateById(id, data) {
        return client_1.prisma.booking.update({ where: { id }, data });
    }
    async updateMany(filter, data) {
        return client_1.prisma.booking.updateMany({ where: filter, data });
    }
    async removeById(id) {
        return client_1.prisma.booking.delete({ where: { id } });
    }
    async removeMany(filter) {
        return client_1.prisma.booking.deleteMany({ where: filter });
    }
}
exports.BookingRepository = BookingRepository;
