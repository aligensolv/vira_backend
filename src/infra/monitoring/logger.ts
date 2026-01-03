import { createLogger, format, transports } from 'winston'
import { appConfig } from '../../core/config/server_configs';

// Define log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

// Create the logger
import type TransportStream from 'winston-transport';

const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: (
    [
      appConfig.env == 'development' ? new transports.Console({
        format: format.combine(
          format.colorize(),
          format.cli(),
        ),
      }) : undefined,
      // Log to a file in all environments
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format.combine(
          format.colorize(),
          format.simple(),
        ),
      }),

      new transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.simple(),
        )
      }),
      
      new transports.File({
        filename: 'logs/combined.log',

      }),
    ].filter(Boolean) as TransportStream[]
  ),
});


export default logger;
