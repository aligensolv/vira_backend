"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.out_prisma = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const globalForPrisma = globalThis;
// const connectionString = `${process.env.DATABASE_URL}`;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
exports.out_prisma = globalForPrisma.out_prisma ?? new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.out_prisma = exports.out_prisma;
