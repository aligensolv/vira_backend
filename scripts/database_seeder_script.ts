import { DatabaseSeeder } from './../src/core/prisma/database_seeder';
async function main() {
    await DatabaseSeeder.fresh()
}

main()