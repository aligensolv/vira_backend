"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const user_factory_1 = require("./user.factory");
const client_1 = require("../../core/prisma/client");
class UserSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        // Default seeding logic - customize as needed
        await this.seed();
    }
    /**
     * Seed Users table.
     */
    static async seed() {
        console.log(`🌱 Seeding Users...`);
        // Create your seeding logic here
        const usersData = user_factory_1.UserFactory.count(10).make();
        const result = await client_1.prisma.user.createMany({
            data: usersData,
            skipDuplicates: true,
        });
        console.log(`✅ Seeded ${result.count} Users`);
    }
    /**
     * Truncate the Users table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Users table...`);
        const result = await client_1.prisma.user.deleteMany({});
        console.log(`✅ Truncated ${result.count} Users`);
    }
}
exports.UserSeeder = UserSeeder;
