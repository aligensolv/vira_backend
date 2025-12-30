import "dotenv/config";

import { DatabaseSeeder } from './../src/core/prisma/database_seeder';
async function main() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`🌱 Running database seeder in ${environment} environment...`);
    if (environment == 'development') {
        return await DatabaseSeeder.development();
    } else {
        return await DatabaseSeeder.production();
    }
}

main()