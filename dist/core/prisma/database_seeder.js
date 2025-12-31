"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
class DatabaseSeeder {
    static async call(seeders) {
        for (const seeder of seeders) {
            await seeder.truncate();
            await seeder.run();
        }
    }
    static async development() {
        console.log("> Seeding development data...");
        await this.call([]);
    }
    static async production() {
        console.log("> Seeding production data...");
        await this.call([]);
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
