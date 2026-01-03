"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRepository = void 0;
const client_1 = require("../../core/prisma/client");
class ManagerRepository {
    async findMany(filter) {
        return client_1.prisma.user.findMany({
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
    async findUnique(filter) {
        return client_1.prisma.user.findUnique({ where: filter });
    }
    async insert(data) {
        return client_1.prisma.user.create({ data });
    }
    async deleteById(id) {
        return client_1.prisma.user.delete({ where: { id } });
    }
    async updateById(id, data) {
        return client_1.prisma.user.update({ where: { id }, data });
    }
}
exports.ManagerRepository = ManagerRepository;
