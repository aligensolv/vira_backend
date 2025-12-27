"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_configs_1 = require("./core/config/server_configs");
const app_1 = require("./app");
const logger_1 = __importDefault(require("./core/utils/logger"));
async function shutdown(server) {
    console.log("🔻 Shutting down gracefully...");
    server.close(() => {
        console.log("✅ Closed remaining connections");
        process.exit(0);
    });
    // Force exit if not closed in X sec
    setTimeout(() => process.exit(1), 10000);
}
async function main() {
    try {
        const server = app_1.app.listen(server_configs_1.appConfig.port, () => {
            console.log(`[server] => http://localhost:${server_configs_1.appConfig.port}`);
        });
        server.on('error', (err) => {
            logger_1.default.error('Server error:', err.message);
            process.exit(1);
        });
        process.on("SIGTERM", () => shutdown(server));
        process.on("SIGINT", () => shutdown(server));
    }
    catch (err) {
        logger_1.default.error('Failed to start server:', err);
        console.log(err);
        process.exit(1);
    }
}
main();
