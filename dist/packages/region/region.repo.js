"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionRepository = void 0;
const client_1 = require("../../core/prisma/client");
class RegionRepository {
    async findMany(filter) {
        return client_1.prisma.region.findMany({ where: filter });
    }
    async findById(id) {
        return client_1.prisma.region.findUnique({ where: { id } });
    }
    async insert(data) {
        return client_1.prisma.region.create({ data });
    }
    async updateById(id, data) {
        return client_1.prisma.region.update({ where: { id }, data });
    }
    async removeById(id) {
        return client_1.prisma.region.delete({ where: { id } });
    }
    async exists(id) {
        const region = await this.findById(id);
        return !!region;
    }
    async search(filter) {
        return await client_1.prisma.region.findFirst({ where: filter });
    }
}
exports.RegionRepository = RegionRepository;
