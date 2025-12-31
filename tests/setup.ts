// /**
//  * Professional Test Setup for Jest + Prisma + Express
//  * ====================================================
//  *
//  * Responsibilities:
//  * 1. Load test environment variables from .env.test
//  * 2. Reset and migrate test database
//  * 3. Seed test data automatically per feature
//  * 4. Provide global helpers for tests
//  * 5. Clear cache, mock services, and disconnect Prisma after tests
//  */

// import 'dotenv/config';
// import path from 'path';
// import fs from 'fs';
// import { execSync } from 'child_process';
// import { prisma } from '../src/core/prisma/client';
// import dotenv from 'dotenv'

// dotenv.config({
//   path: '../.env.test'
// })

// type SeedFunction = () => Promise<void>;

// /**
//  * Load .env.test file
//  */
// const TEST_ENV_PATH = path.resolve(__dirname, '../.env.test');
// if (fs.existsSync(TEST_ENV_PATH)) {
//   (await import('dotenv')).config({ path: TEST_ENV_PATH });
// } else {
//   console.warn('⚠️  .env.test not found, using default environment variables.');
// }

// /**
//  * Automatically load all seed files per feature
//  */
// const loadSeeds = async () => {
//   const seedDir = path.resolve(__dirname, '../prisma/seeds');
//   if (!fs.existsSync(seedDir)) return;

//   const files = fs.readdirSync(seedDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
//   for (const file of files) {
//     const seedPath = path.join(seedDir, file);
//     console.log(`🌱 Running seed: ${file}`);
//     const seedModule: { default?: SeedFunction; seed?: SeedFunction } = await import(seedPath);
//     if (typeof seedModule.default === 'function') await seedModule.default();
//     if (typeof seedModule.seed === 'function') await seedModule.seed();
//   }
// };

// /**
//  * Reset the database
//  */
// const resetDatabase = () => {
//   console.log('🔄 Resetting test database...');
//   execSync('npx prisma migrate reset --force --skip-generate', { stdio: 'inherit' });
//   execSync('npx prisma generate', { stdio: 'inherit' });
// };

// /**
//  * Clear database tables before each test
//  */
// const clearDatabase = async () => {
//   const tables = ['Manager']; // add all main tables or generate dynamically
//   for (const table of tables) {
//     await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
//   }
// };

// /**
//  * Professional setup function
//  */
// const setup = async () => {
//   resetDatabase();
//   await loadSeeds();
//   console.log('✅ Test environment ready');
// };

// /**
//  * Professional teardown function
//  */
// const teardown = async () => {
//   console.log('🧹 Cleaning up after tests...');
//   await prisma.$disconnect();
// };

// /**
//  * Optional beforeEach hook to clean DB before each test
//  */
// const setupEachTest = async () => {
//   await clearDatabase();
// };

// export default setup;
// export { teardown, setupEachTest };
