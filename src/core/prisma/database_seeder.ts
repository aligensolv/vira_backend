import { UserSeeder } from '../../packages/auth/auth.seeder';
import { PlaceSeeder } from '../../packages/place';
import { RegionSeeder } from '../../packages/region';
import { Seeder } from './../interfaces/seeder';

export class DatabaseSeeder {
  private static async call(seeders: Array<Seeder>) {
    for (const seeder of seeders) {
      await seeder.truncate();
      await seeder.run();
    }
  }

  static async development() {
    console.log("> Seeding development data...");
    await this.call([
      UserSeeder,
      RegionSeeder,
      PlaceSeeder
    ]);
  }

  static async production() {
    console.log("> Seeding production data...");
    await this.call([
      
    ]);
  }
}
