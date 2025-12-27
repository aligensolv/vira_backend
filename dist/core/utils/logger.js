"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const server_configs_1 = require("../config/server_configs");
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
const logger = (0, winston_1.createLogger)({
    levels: customLevels.levels,
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        server_configs_1.appConfig.env == 'development' ? new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.cli()),
        }) : undefined,
        // Log to a file in all environments
        new winston_1.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
        new winston_1.transports.File({
            filename: 'logs/info.log',
            level: 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        }),
        new winston_1.transports.File({
            filename: 'logs/combined.log',
        }),
    ].filter(Boolean),
});
exports.default = logger;
