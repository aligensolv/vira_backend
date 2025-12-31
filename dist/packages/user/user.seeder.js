"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const client_1 = require("../../core/prisma/client");
const user_factory_1 = require("./user.factory");
class UserSeeder {
    static async run() {
        console.log("> Seeding users...");
        const usersData = user_factory_1.UserFactory.count(10).make(); // creates 10 normal users
        const result = await client_1.prisma.user.createMany({
            data: usersData,
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
