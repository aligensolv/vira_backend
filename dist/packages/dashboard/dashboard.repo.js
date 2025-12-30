"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const client_1 = require("../../core/prisma/client");
class DashboardRepository {
    async findMany(filter) {
        return client_1.prisma.dashboard.findMany({ where: filter });
    }
    async findById(id) {
        return client_1.prisma.dashboard.findUnique({ where: { id } });
    }
    async findOne(filter) {
        return client_1.prisma.dashboard.findFirst({ where: filter });
    }
    async exists(filter) {
        const count = await client_1.prisma.dashboard.count({ where: filter });
        return count > 0;
    }
    async insert(data) {
        return client_1.prisma.dashboard.create({ data });
    }
    async updateById(id, data) {
        return client_1.prisma.dashboard.update({ where: { id }, data });
    }
    async updateMany(filter, data) {
        return client_1.prisma.dashboard.updateMany({ where: filter, data });
    }
    async removeById(id) {
        return client_1.prisma.dashboard.delete({ where: { id } });
    }
    async removeMany(filter) {
        return client_1.prisma.dashboard.deleteMany({ where: filter });
    }
}
exports.DashboardRepository = DashboardRepository;
