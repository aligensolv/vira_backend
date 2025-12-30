"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSeeder = void 0;
const booking_factory_1 = require("./booking.factory");
const client_1 = require("../../core/prisma/client");
class BookingSeeder {
    /**
     * Run the database seeds.
     */
    static async run() {
        // Default seeding logic - customize as needed
        await this.seed();
    }
    /**
     * Seed Bookings table.
     */
    static async seed() {
        console.log(`🌱 Seeding Bookings...`);
        // Create your seeding logic here
        const bookingsData = booking_factory_1.BookingFactory.count(10).make();
        await this.db.$transaction(async (tx) => {
            const result = await client_1.prisma.booking.createMany({
                data: bookingsData,
                skipDuplicates: true,
            });
        });
        console.log(`✅ Seeded ${result.count} Bookings`);
    }
    /**
     * Truncate the Bookings table.
     */
    static async truncate() {
        console.log(`🧹 Truncating Bookings table...`);
        const result = await client_1.prisma.booking.deleteMany({});
        console.log(`✅ Truncated ${result.count} Bookings`);
    }
}
exports.BookingSeeder = BookingSeeder;
