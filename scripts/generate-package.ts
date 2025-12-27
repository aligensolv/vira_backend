import fs from "fs";
import path from "path";

const featureName = process.argv[2];

if (!featureName) {
  console.error("❌ Please provide a feature name: npm run generate featureName");
  process.exit(1);
}

const featureNameLower = featureName.toLowerCase();
const basePath = path.join("src", "packages", featureNameLower);

if (fs.existsSync(basePath)) {
  console.error("❌ Feature already exists!");
  process.exit(1);
}

fs.mkdirSync(basePath, { recursive: true });

const files: Record<string, string> = {
  [`${featureNameLower}.controller.ts`]: `import { Request, Response } from "express";
import ${featureName}Service from "./${featureNameLower}.service";

export async function get${featureName}sHandler(req: Request, res: Response) {
  const data = await ${featureName}Service.getAll${featureName}s();
  res.json({ data });
}
`,

  [`${featureNameLower}.service.ts`]: `import promiseWrapper from "../../lib/promise_wrapper";
import { to${featureName}DTO } from "./${featureName.toLowerCase()}.mapper";
import ${featureName}Repository from "./${featureName.toLowerCase()}.repo";


export class ${featureName}Service {
  public getAll${featureName}s = async () => promiseWrapper(
    async (resolve) => {
      const result = await ${featureName}Repository.getAll${featureName}s()
      return resolve(
        result.map(to${featureName}DTO)
      );
    }
  )
}

export const ${featureNameLower}Service = new ${featureName}Service()
`,
  [`${featureNameLower}.repo.ts`]: `import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class ${featureName}Repository {
    async findMany(filter?: Prisma.${featureName}WhereInput) {
        return prisma.${featureNameLower}.findMany({ where: filter });
    }

    async findById(id: number) {
        return prisma.${featureNameLower}.findUnique({ where: { id } });
    }

    async findOne(filter: Prisma.${featureName}WhereInput) {
        return prisma.${featureNameLower}.findFirst({ where: filter });
    }

    async exists(filter: Prisma.${featureName}WhereInput) {
        const count = await prisma.${featureNameLower}.count({ where: filter });
        return count > 0;
    }

    async insert(data: Prisma.${featureName}CreateInput) {
        return prisma.${featureNameLower}.create({ data });
    }

    async updateById(id: number, data: Prisma.${featureName}UpdateInput) {
        return prisma.${featureNameLower}.update({ where: { id }, data });
    }

    async updateMany(filter: Prisma.${featureName}WhereInput, data: Prisma.${featureName}UpdateInput) {
        return prisma.${featureNameLower}.updateMany({ where: filter, data });
    }

    async removeById(id: number) {
        return prisma.${featureNameLower}.delete({ where: { id } });
    }

    async removeMany(filter: Prisma.${featureName}WhereInput) {
        return prisma.${featureNameLower}.deleteMany({ where: filter });
    }
}
`,

  [`${featureNameLower}.mapper.ts`]: `import type { ${featureName} } from "@prisma/client";
import type { ${featureName}DTO } from "./${featureNameLower}.dto";

// Transform DB result to DTO
export function to${featureName}DTO(entity: ${featureName}): ${featureName}DTO {
  return entity;
}
`,

  [`${featureNameLower}.dto.ts`]: `export type ${featureName}DTO = {
  id: number;
};
`,

  [`${featureNameLower}.schema.ts`]: `import { z } from "zod";

export const create${featureName}Schema = z.object({
  // define request validation here
});
`,

  [`${featureNameLower}.routes.ts`]: `import { Router } from "express";
import { get${featureName}sHandler } from "./${featureNameLower}.controller";

const router = Router();

router.get("/${featureNameLower}s", get${featureName}sHandler);

export default router;
`,

  ["index.ts"]: `export * from "./${featureNameLower}.controller";
export * from "./${featureNameLower}.service";
export * from "./${featureNameLower}.mapper";
export * from "./${featureNameLower}.dto";
export * from "./${featureNameLower}.schema";
export * from "./${featureNameLower}.repo";
export * from "./${featureNameLower}.factory";
export * from "./${featureNameLower}.seeder";
export { default as ${featureName}Routes } from "./${featureNameLower}.routes";
`,
[`${featureNameLower}.factory.ts`]: `import { faker } from "@faker-js/faker";
import type { ${featureName} } from "@prisma/client";

export class ${featureName}Factory {
  /**
   * Define the model's default state.
   */
  static definition(): Omit<${featureName}, 'id'> {
    return {
      // Customize the fields based on your ${featureName} model

    };
  }

  /**
   * Create a single ${featureName} instance.
   */
  static make(overrides: Partial<Omit<${featureName}, 'id'>> = {}): Omit<${featureName}, 'id'> {
    return {
      ...this.definition(),
      ...overrides,
    };
  }

  /**
   * Create multiple ${featureName} instances.
   */
  static count(amount: number): {
    make(overrides?: Partial<Omit<${featureName}, 'id'>>): Omit<${featureName}, 'id'>[];
  } {
    return {
      make: (overrides = {}) => {
        return Array.from({ length: amount }, () => this.make(overrides));
      },
    };
  }

  /**
   * Define a state modification.
   */
  static state(stateOverrides: Partial<Omit<${featureName}, 'id'>>): {
    make(overrides?: Partial<Omit<${featureName}, 'id'>>): Omit<${featureName}, 'id'>;
    count(amount: number): {
      make(overrides?: Partial<Omit<${featureName}, 'id'>>): Omit<${featureName}, 'id'>[];
    };
  } {
    return {
      make: (overrides = {}) => this.make({ ...stateOverrides, ...overrides }),
      count: (amount: number) => ({
        make: (overrides = {}) => {
          return Array.from({ length: amount }, () => this.make({ ...stateOverrides, ...overrides }));
        },
      }),
    };
  }
}
`,

  [`${featureNameLower}.seeder.ts`]: `import { ${featureName}Factory } from "./${featureNameLower}.factory";
import { prisma } from "../../core/prisma/client";

export class ${featureName}Seeder {
  /**
   * Run the database seeds.
   */
  static async run(): Promise<void> {
    // Default seeding logic - customize as needed
    await this.seed();
  }

  /**
   * Seed ${featureName}s table.
   */
  private static async seed(): Promise<void> {
    console.log(\`🌱 Seeding ${featureName}s...\`);

    // Create your seeding logic here
    const ${featureNameLower}sData = ${featureName}Factory.count(10).make();

    const result = await prisma.${featureNameLower}.createMany({
      data: ${featureNameLower}sData,
      skipDuplicates: true,
    });

    console.log(\`✅ Seeded \${result.count} ${featureName}s\`);
  }

  /**
   * Truncate the ${featureName}s table.
   */
  static async truncate(): Promise<void> {
    console.log(\`🧹 Truncating ${featureName}s table...\`);
    
    const result = await prisma.${featureNameLower}.deleteMany({});
    
    console.log(\`✅ Truncated \${result.count} ${featureName}s\`);
  }

  /**
   * Fresh seed - truncate then seed.
   */
  static async fresh(): Promise<void> {
    await this.truncate();
    await this.run();
  }
}
`,
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(basePath, file), content);
}

console.log(`✅ Feature '${featureNameLower}' created in ${basePath}`);

// --- Inject into app.ts ---
const appFilePath = path.join("src", "app.ts");
let appFile = fs.readFileSync(appFilePath, "utf-8");

// 1. Add import if missing
const importStatement = `import { ${featureName}Routes } from './packages/${featureNameLower}';`;
if (!appFile.includes(importStatement)) {
  const lastImportIndex = appFile.lastIndexOf("import");
  const firstLineBreak = appFile.indexOf("\n", lastImportIndex);
  appFile =
    appFile.slice(0, firstLineBreak + 1) +
    importStatement +
    "\n" +
    appFile.slice(firstLineBreak + 1);
}

// 2. Add or update app.use('/api', ...)
const apiUseRegex = /app\.use\(\s*['"]\/api['"][^)]*\)/s;

if (apiUseRegex.test(appFile)) {
appFile = appFile.replace(
  apiUseRegex,
  (match) => {
    // Find the last line before the closing parenthesis
    const lines = match.split('\n');
    const lastLineIdx = lines.length - 1;
    // Find the line with '/api'
    // Check if the line before ')' ends with a comma
    const beforeParenIdx = lastLineIdx - 1;
    if (lines[beforeParenIdx] && !lines[beforeParenIdx].trim().endsWith(',')) {
      lines[beforeParenIdx] = lines[beforeParenIdx].replace(/(\S)(\s*)$/, '$1,$2');
    }
    // Insert the new route before the closing parenthesis
    lines.splice(beforeParenIdx + 1, 0, `  ${featureName}Routes`);
    return lines.join('\n');
  }
);
} else {
  // create new app.use('/api', ...)
  const appDeclarationIndex = appFile.indexOf("export const app");
  const insertIndex = appFile.indexOf("\n", appDeclarationIndex);
  appFile =
    appFile.slice(0, insertIndex + 1) +
    `\napp.use(\n  '/api',\n  ${featureName}Routes\n)\n\n` +
    appFile.slice(insertIndex + 1);
}

fs.writeFileSync(appFilePath, appFile, "utf-8");
console.log(`✅ Injected ${featureName}Routes into app.ts`);
