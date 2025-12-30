"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerSeeder = void 0;
const client_1 = require("../../core/prisma/client");
const password_1 = require("../../core/utils/auth/password");
class ManagerSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        // Default seeding logic - customize as needed
        await this.seed();
    }
    /**
     * Seed Managers table.
     */
    static async seed() {
        console.log(`🌱 Seeding Managers...`);
        // Create your seeding logic here
        const managersData = [
            {
                name: 'Vira Admin',
                email: 'admin@vira.no',
                password: await (0, password_1.hashPassword)('vira'),
            }
        ];
        const result = await client_1.prisma.manager.createMany({
            data: managersData,
            skipDuplicates: true,
        });
        console.log(`✅ Seeded ${result.count} Managers`);
    }
    /**
     * Truncate the Managers table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Managers table...`);
        const result = await client_1.prisma.manager.deleteMany({});
        console.log(`✅ Truncated ${result.count} Managers`);
    }
    /**
     * Fresh seed - truncate then seed.
     */
    static async fresh() {
        await this.truncate();
        await this.run();
    }
}
exports.ManagerSeeder = ManagerSeeder;
