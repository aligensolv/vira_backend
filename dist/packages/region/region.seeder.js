"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionSeeder = void 0;
const region_factory_1 = require("./region.factory");
const client_1 = require("../../core/prisma/client");
class RegionSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        console.log(`🌱 Seeding Regions...`);
        // Create your seeding logic here
        const regionsData = region_factory_1.RegionFactory.count(10).make();
        await client_1.prisma.$transaction(async () => {
            const result = await client_1.prisma.region.createMany({
                data: regionsData,
                skipDuplicates: true,
            });
            console.log(`✅ Seeded ${result.count} Regions`);
        });
    }
    /**
     * Truncate the Regions table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Regions table...`);
        const result = await client_1.prisma.region.deleteMany({});
        console.log(`✅ Truncated ${result.count} Regions`);
    }
}
exports.RegionSeeder = RegionSeeder;
