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

    ]);
  }

  static async production() {
    console.log("> Seeding production data...");
    await this.call([
      
    ]);
  }
}
