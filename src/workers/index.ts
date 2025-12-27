// src/workers/index.ts
import * as path from "path";
import * as fs from "fs";

const workersPath = __dirname;

// Loop through all worker files
fs.readdirSync(workersPath).forEach(async (file) => {
  if (file.endsWith(".worker.ts") || file.endsWith(".worker.js")) {
    const workerModule = import(path.join(workersPath, file));
    // Each worker should export a start function
    for (const key in workerModule) {
      if (key.startsWith("start")) {
        (await workerModule)[key]();
        console.log(`✅ Started worker from ${file}`);
      }
    }
  }
});
