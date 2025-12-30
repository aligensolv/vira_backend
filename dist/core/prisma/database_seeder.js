"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const manager_1 = require("../../packages/manager");
const place_1 = require("../../packages/place");
const region_1 = require("../../packages/region");
const user_1 = require("../../packages/user");
class DatabaseSeeder {
    /**
     * Seed the application's database.
     */
    static async run() {
        console.log('🌱 Starting database seeding...');
        try {
            await this.call([
                user_1.UserSeeder
            ]);
            console.log('✅ Database seeding completed successfully!');
        }
        catch (error) {
            console.error('❌ Database seeding failed:', error);
            throw error;
        }
    }
    /**
     * Call multiple seeders in sequence.
     */
    static async call(seeders) {
        for (const seeder of seeders) {
            await seeder.truncate();
            await seeder.run();
        }
    }
    /**
     * Run seeders in development environment.
     */
    static async development() {
        console.log('🌱 Seeding development data...');
        await this.call([
            user_1.UserSeeder,
            manager_1.ManagerSeeder,
            region_1.RegionSeeder,
            place_1.PlaceSeeder
        ]);
    }
    /**
     * Run seeders in production environment.
     */
    static async production() {
        console.log('🌱 Seeding production data...');
        // Add production-specific seeding logic (usually minimal)
        await this.call([
            manager_1.ManagerSeeder
        ]);
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
