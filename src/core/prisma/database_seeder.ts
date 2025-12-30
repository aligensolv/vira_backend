import { ManagerSeeder } from "../../packages/manager";
import { PlaceSeeder } from "../../packages/place";
import { RegionSeeder } from "../../packages/region";
import { UserSeeder } from "../../packages/user";
import { Seeder } from "../interfaces/seeder";

export class DatabaseSeeder {
  /**
   * Seed the application's database.
   */
  static async run(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      await this.call([
        UserSeeder
      ]);

      console.log('✅ Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  /**
   * Call multiple seeders in sequence.
   */
  private static async call(seeders: Array<Seeder>): Promise<void> {
    for (const seeder of seeders) {
      await seeder.truncate();
      await seeder.run();
    }
  }

  /**
   * Run seeders in development environment.
   */
  static async development(): Promise<void> {
    console.log('🌱 Seeding development data...');
    
    await this.call([
      UserSeeder,
      ManagerSeeder,
      RegionSeeder,
      PlaceSeeder
    ]);
  }

  /**
   * Run seeders in production environment.
   */
  static async production(): Promise<void> {
    console.log('🌱 Seeding production data...');
    
    // Add production-specific seeding logic (usually minimal)
    await this.call([
      ManagerSeeder
    ]);
  }
}