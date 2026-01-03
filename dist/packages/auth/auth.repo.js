"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const client_1 = require("../../core/prisma/client");
class AuthRepository {
    async findUserByEmail(email) {
        return client_1.prisma.user.findUnique({
            where: { email },
        });
    }
    async findUserById(id) {
        return client_1.prisma.user.findUnique({
            where: { id }
        });
    }
    async insert(data) {
        return client_1.prisma.user.create({ data });
    }
}
exports.AuthRepository = AuthRepository;
