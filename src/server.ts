import { appConfig } from './core/config/server_configs';
import { app } from './app';
import logger from './infra/monitoring/logger';
import { Server } from 'http';
import { initSocket } from "./infra/realtime/socket";
import { shutdownRedis } from './infra/cache/redis.client';

const server = app.listen(appConfig.port, () => {
  console.log(`[server] => http://localhost:${appConfig.port}`);
});

export const io = initSocket(server);


async function shutdown(server: Server) {
  console.log("🔻 Shutting down gracefully...");
  await shutdownRedis()
  await io.close()


  server.close(() => {
    console.log("✅ Closed remaining connections");
    process.exit(0);
  });

  // Force exit if not closed in X sec
  setTimeout(() => process.exit(1), 10000);
}

async function main() {
  try {

    server.on('error', (err) => {
      logger.error('Server error:', err.message);
      process.exit(1);
    });

    process.on("SIGTERM", () => shutdown(server));
    process.on("SIGINT", () => shutdown(server));
  } catch (err) {
    logger.error('Failed to start server:', err);
    console.log(err)
    process.exit(1);
  }
}

main();