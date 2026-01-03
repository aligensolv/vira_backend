"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRepository = void 0;
const client_1 = require("../../core/prisma/client");
class PlaceRepository {
    async findMany(filter) {
        return client_1.prisma.place.findMany({
            where: filter,
            include: {
                region: true
            }
        });
    }
    async findById(id) {
        return client_1.prisma.place.findUnique({ where: { id } });
    }
    async findOne(filter) {
        return client_1.prisma.place.findFirst({ where: filter });
    }
    async exists(filter) {
        const count = await client_1.prisma.place.count({ where: filter });
        return count > 0;
    }
    async count(filter) {
        const count = await client_1.prisma.place.count({ where: filter });
        return count;
    }
    async insert(data) {
        return client_1.prisma.place.create({
            data,
            include: {
                region: true
            }
        });
    }
    async updateById(id, data) {
        return client_1.prisma.place.update({
            where: { id },
            data,
            include: {
                region: true
            }
        });
    }
    async updateMany(filter, data) {
        return client_1.prisma.place.updateMany({ where: filter, data });
    }
    async removeById(id) {
        return client_1.prisma.place.delete({
            where: { id },
            include: {
                region: true
            }
        });
    }
    async removeMany(filter) {
        return client_1.prisma.place.deleteMany({ where: filter });
    }
    async search(filter) {
        return await client_1.prisma.region.findFirst({ where: filter });
    }
}
exports.PlaceRepository = PlaceRepository;
