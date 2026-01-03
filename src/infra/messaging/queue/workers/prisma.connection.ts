import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  out_prisma: PrismaClient | undefined;
};

// const connectionString = `${process.env.DATABASE_URL}`;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

export const out_prisma = globalForPrisma.out_prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.out_prisma = out_prisma;