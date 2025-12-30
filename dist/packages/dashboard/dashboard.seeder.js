"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSeeder = void 0;
const dashboard_factory_1 = require("./dashboard.factory");
const client_1 = require("../../core/prisma/client");
class DashboardSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        // Default seeding logic - customize as needed
        await this.seed();
    }
    /**
     * Seed Dashboards table.
     */
    static async seed() {
        console.log(`🌱 Seeding Dashboards...`);
        // Create your seeding logic here
        const dashboardsData = dashboard_factory_1.DashboardFactory.count(10).make();
        await this.db.$transaction(async (tx) => {
            const result = await client_1.prisma.dashboard.createMany({
                data: dashboardsData,
                skipDuplicates: true,
            });
        });
        console.log(`✅ Seeded ${result.count} Dashboards`);
    }
    /**
     * Truncate the Dashboards table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Dashboards table...`);
        const result = await client_1.prisma.dashboard.deleteMany({});
        console.log(`✅ Truncated ${result.count} Dashboards`);
    }
}
exports.DashboardSeeder = DashboardSeeder;
