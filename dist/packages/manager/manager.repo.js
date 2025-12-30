"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRepository = void 0;
const client_1 = require("../../core/prisma/client");
class ManagerRepository {
    async findMany(filter) {
        return client_1.prisma.manager.findMany({ where: filter });
    }
    async findById(id) {
        return client_1.prisma.manager.findUnique({ where: { id } });
    }
    async findOne(filter) {
        return client_1.prisma.manager.findFirst({ where: filter });
    }
    async exists(filter) {
        const count = await client_1.prisma.manager.count({ where: filter });
        return count > 0;
    }
    async insert(data) {
        return client_1.prisma.manager.create({ data });
    }
    async updateById(id, data) {
        return client_1.prisma.manager.update({ where: { id }, data });
    }
    async updateMany(filter, data) {
        return client_1.prisma.manager.updateMany({ where: filter, data });
    }
    async removeById(id) {
        return client_1.prisma.manager.delete({ where: { id } });
    }
    async removeMany(filter) {
        return client_1.prisma.manager.deleteMany({ where: filter });
    }
}
exports.ManagerRepository = ManagerRepository;
