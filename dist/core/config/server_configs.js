"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = exports.emailConfig = exports.corsConfig = exports.securityConfig = exports.appConfig = void 0;
require("dotenv/config");
// App Configs
exports.appConfig = {
    name: process.env.APP_NAME || 'vira booking backend',
    url: process.env.APP_URL || 'http://localhost:3000',
    env: (process.env.NODE_ENV || 'development'),
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    logLevel: process.env.LOG_LEVEL || 'info',
};
// Security Configs
exports.securityConfig = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
// CORS Configs
exports.corsConfig = {
    whitelist: process.env.CORS_WHITELIST?.split(',') || [],
};
// Email Configs
exports.emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || 'your_email@example.com',
    pass: process.env.EMAIL_PASS || 'your_email_password',
    from: process.env.EMAIL_FROM || 'your_email@example.com',
};
// Upload Configs
exports.uploadConfig = {
    dir: process.env.UPLOAD_DIR || 'uploads',
};
