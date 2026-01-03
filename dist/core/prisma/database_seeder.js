"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const auth_seeder_1 = require("../../packages/auth/auth.seeder");
const place_1 = require("../../packages/place");
const region_1 = require("../../packages/region");
class DatabaseSeeder {
    static async call(seeders) {
        for (const seeder of seeders) {
            await seeder.truncate();
            await seeder.run();
        }
    }
    static async development() {
        console.log("> Seeding development data...");
        await this.call([
            auth_seeder_1.UserSeeder,
            region_1.RegionSeeder,
            place_1.PlaceSeeder
        ]);
    }
    static async production() {
        console.log("> Seeding production data...");
        await this.call([]);
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
