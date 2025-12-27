import { ManagerSeeder } from "../../packages/manager/manager.seeder";

export class DatabaseSeeder {
  /**
   * Seed the application's database.
   */
  static async run(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      // Call your seeders in the desired order
      await this.call([
        ManagerSeeder
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
  private static async call(seeders: Array<{ run(): Promise<void> }>): Promise<void> {
    for (const seeder of seeders) {
      await seeder.run();
    }
  }

  /**
   * Fresh seed - truncate all tables then seed.
   */
  static async fresh(): Promise<void> {
    console.log('🧹 Starting fresh database seeding...');

    try {
      // Call fresh on your seeders in reverse order for proper cleanup
      await ManagerSeeder.fresh()

      console.log('✅ Fresh database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Fresh database seeding failed:', error);
      throw error;
    }
  }

  /**
   * Run seeders in development environment.
   */
  static async development(): Promise<void> {
    console.log('🌱 Seeding development data...');
    
    // Add development-specific seeding logic
    await this.run();
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