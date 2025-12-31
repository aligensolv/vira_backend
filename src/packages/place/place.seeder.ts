import { PlaceFactory } from "./place.factory";
import { prisma } from "../../core/prisma/client";

export class PlaceSeeder {
  /**
   * Run the database seeds.
   */
  static async run(): Promise<void> {
    console.log(`🌱 Seeding Places...`);

    // Create your seeding logic here
    const placesData = PlaceFactory.count(10).make();

    await prisma.$transaction(async () => {
      const result = await prisma.place.createMany({
        data: placesData,
        skipDuplicates: true,
      });

      console.log(`✅ Seeded ${result.count} Places`);
    });
  }


  /**
   * Truncate the Places table.
   */
  static async truncate(): Promise<void> {
    console.log(`🧹 Truncating Places table...`);

    const result = await prisma.place.deleteMany({});
    
    console.log(`✅ Truncated ${result.count} Places`);
  }
}
