import { appConfig } from './../src/core/config/server_configs';
import "dotenv/config";

import { DatabaseSeeder } from './../src/core/prisma/database_seeder';
async function main() {
    const environment = appConfig.env;
    
    console.log(`> Running database seeder in ${environment} environment...`);
    if (environment == 'development') {
        return await DatabaseSeeder.development();
    } else {
        return await DatabaseSeeder.production();
    }
}

main()