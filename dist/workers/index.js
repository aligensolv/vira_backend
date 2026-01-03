"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/workers/index.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const activeWorkers = [];
const workersPath = __dirname;
async function startWorkers() {
    const files = fs_1.default.readdirSync(workersPath);
    for (const file of files) {
        if (!file.endsWith(".worker.mjs") && !file.endsWith(".worker.mts")) {
            continue;
        }
        // const modulePath = path.join(workersPath, file);
        const fullPath = path_1.default.join(workersPath, file);
        const fileUrl = (0, url_1.pathToFileURL)(fullPath).href; // 🔑 FIX
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
