"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSeeder = void 0;
const place_factory_1 = require("./place.factory");
const client_1 = require("../../core/prisma/client");
class PlaceSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        // Default seeding logic - customize as needed
        await this.seed();
    }
    /**
     * Seed Places table.
     */
    static async seed() {
        console.log(`🌱 Seeding Places...`);
        // Create your seeding logic here
        const placesData = place_factory_1.PlaceFactory.count(10).make();
        await client_1.prisma.$transaction(async () => {
            const result = await client_1.prisma.place.createMany({
                data: placesData,
                skipDuplicates: true,
            });
            console.log(`✅ Seeded ${result.count} Places`);
        });
    }
    /**
     * Truncate the Places table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Places table...`);
        const result = await client_1.prisma.place.deleteMany({});
        console.log(`✅ Truncated ${result.count} Places`);
    }
}
exports.PlaceSeeder = PlaceSeeder;
