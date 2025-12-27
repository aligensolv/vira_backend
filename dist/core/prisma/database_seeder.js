"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const manager_seeder_1 = require("../../packages/manager/manager.seeder");
class DatabaseSeeder {
    /**
     * Seed the application's database.
     */
    static async run() {
        console.log('🌱 Starting database seeding...');
        try {
            // Call your seeders in the desired order
            await this.call([
                manager_seeder_1.ManagerSeeder
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
            await seeder.run();
        }
    }
    /**
     * Fresh seed - truncate all tables then seed.
     */
    static async fresh() {
        console.log('🧹 Starting fresh database seeding...');
        try {
            // Call fresh on your seeders in reverse order for proper cleanup
            await manager_seeder_1.ManagerSeeder.fresh();
            console.log('✅ Fresh database seeding completed successfully!');
        }
        catch (error) {
            console.error('❌ Fresh database seeding failed:', error);
            throw error;
        }
    }
    /**
     * Run seeders in development environment.
     */
    static async development() {
        console.log('🌱 Seeding development data...');
        // Add development-specific seeding logic
        await this.run();
    }
    /**
     * Run seeders in production environment.
     */
    static async production() {
        console.log('🌱 Seeding production data...');
        // Add production-specific seeding logic (usually minimal)
        await this.call([
            manager_seeder_1.ManagerSeeder
        ]);
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
