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
}
exports.ManagerRepository = ManagerRepository;
