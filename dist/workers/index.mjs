// src/workers/index.ts
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const activeWorkers = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workersPath = __dirname;
async function startWorkers() {
    const files = fs.readdirSync(workersPath);
    for (const file of files) {
        if (!file.endsWith(".worker.mjs") && !file.endsWith(".worker.mts")) {
            continue;
        }
        // const modulePath = path.join(workersPath, file);
        const fullPath = path.join(workersPath, file);
        const fileUrl = pathToFileURL(fullPath).href; // 🔑 FIX
        const workerModule = await import(fileUrl);
        for (const exportKey of Object.keys(workerModule)) {
            if (exportKey.startsWith("start")) {
                const worker = workerModule[exportKey]();
                activeWorkers.push(worker);
                console.log(`✅ Started ${exportKey} from ${file}`);
            }
        }
    }
}
startWorkers();
async function shutdown() {
    console.log("🛑 Shutting down workers...");
    for (const worker of activeWorkers) {
        await worker.close(); // waits for active jobs
    }
    process.exit(0);
}
["SIGINT", "SIGTERM", "SIGQUIT"].forEach(signal => {
    process.on(signal, shutdown);
});
