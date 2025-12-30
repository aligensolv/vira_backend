"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("../../core/prisma/client");
class UserRepository {
    async findMany(filter) {
        return client_1.prisma.user.findMany({ where: filter });
    }
    async findById(id) {
        return client_1.prisma.user.findUnique({ where: { id } });
    }
    async findOne(filter) {
        return client_1.prisma.user.findFirst({ where: filter });
    }
    async exists(filter) {
        const count = await client_1.prisma.user.count({ where: filter });
        return count > 0;
    }
    async insert(data) {
        return client_1.prisma.user.create({ data });
    }
    async updateById(id, data) {
        return client_1.prisma.user.update({ where: { id }, data });
    }
    async updateMany(filter, data) {
        return client_1.prisma.user.updateMany({ where: filter, data });
    }
    async removeById(id) {
        return client_1.prisma.user.delete({ where: { id } });
    }
    async removeMany(filter) {
        return client_1.prisma.user.deleteMany({ where: filter });
    }
}
exports.UserRepository = UserRepository;
