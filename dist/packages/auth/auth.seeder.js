"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const client_1 = require("../../core/prisma/client");
const password_1 = require("../../core/utils/auth/password");
const auth_factory_1 = require("./auth.factory");
class UserSeeder {
    static async run() {
        console.log("> Seeding users...");
        const users = auth_factory_1.UserFactory.count(10).make();
        const test_user = {
            name: 'test',
            email: 'test@vira.no',
            password: await (0, password_1.generateHashedPassword)('test'),
            role: 'USER'
        };
        const admins = [
            {
                name: "Vira Admin",
                email: "admin@vira.no",
                password: await (0, password_1.generateHashedPassword)("vira"),
                role: "SUPER_ADMIN",
            },
        ];
        const result = await client_1.prisma.user.createMany({
            data: [
                test_user,
                ...users,
                ...admins
            ],
            skipDuplicates: true,
        });
        console.log(`⩥ Seeded ${result.count} users`);
    }
    static async truncate() {
        console.log("🧹 Truncating users table...");
        const result = await client_1.prisma.user.deleteMany({});
        console.log(`⩥ Truncated ${result.count} users`);
    }
}
exports.UserSeeder = UserSeeder;
