import 'dotenv/config'
import type { PrismaConfig } from "prisma";

export default {
  schema: "prisma",

  migrations: {
    seed: "tsx src/core/prisma/seed.ts",
  }
} satisfies PrismaConfig;