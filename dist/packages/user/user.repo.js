"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("../../core/prisma/client");
class UserRepository {
    async findMany(filter) {
        return client_1.prisma.user.findMany({ where: filter });
    }
}
exports.UserRepository = UserRepository;
