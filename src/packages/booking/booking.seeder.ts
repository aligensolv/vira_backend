// import { BookingFactory } from "./booking.factory";
// import { prisma } from "../../core/prisma/client";

// export class BookingSeeder {
//   /**
//    * Run the database seeds.
//    */
//   static async run(): Promise<void> {
//     // Default seeding logic - customize as needed
//     await this.seed();
//   }

//   /**
//    * Seed Bookings table.
//    */
//   private static async seed(): Promise<void> {
//     console.log(`🌱 Seeding Bookings...`);

//     // Create your seeding logic here
//     const bookingsData = BookingFactory.count(10).make();

//     await this.db.$transaction(async (tx) => {
//       const result = await prisma.booking.createMany({
//         data: bookingsData,
//         skipDuplicates: true,
//       });
//     });

//     console.log(`✅ Seeded ${result.count} Bookings`);
//   }

//   /**
//    * Truncate the Bookings table.
//    */
//   static async truncate(): Promise<void> {
//     console.log(`🧹 Truncating Bookings table...`);
    
//     const result = await prisma.booking.deleteMany({});
    
//     console.log(`✅ Truncated ${result.count} Bookings`);
//   }
// }
