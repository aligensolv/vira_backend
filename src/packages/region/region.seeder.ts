import { RegionFactory } from "./region.factory";
import { prisma } from "../../core/prisma/client";

export class RegionSeeder {
  /**
   * Run the database seeds.
   */
  static async run(): Promise<void> {
    console.log(`🌱 Seeding Regions...`);

    // Create your seeding logic here
    const regionsData = RegionFactory.count(10).make();

    await prisma.$transaction(async () => {
      const result = await prisma.region.createMany({
        data: regionsData,
        skipDuplicates: true,
      });

      console.log(`✅ Seeded ${result.count} Regions`);
    });
  }

  /**
   * Truncate the Regions table.
   */
  static async truncate(): Promise<void> {
    console.log(`🧹 Truncating Regions table...`);

    const result = await prisma.region.deleteMany({});

    console.log(`✅ Truncated ${result.count} Regions`);
  }
}
