import 'dotenv/config'

type NodeEnvironment = 'development' | 'production'

// App Configs
export const appConfig = {
  name: process.env.APP_NAME || 'vira booking backend',
  url: process.env.APP_URL || 'http://localhost:3000',
  env: (process.env.NODE_ENV || 'development') as NodeEnvironment,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  logLevel: process.env.LOG_LEVEL || 'info',
}

// Security Configs
export const securityConfig = {
  jwtSecret: process.env.JWT_SECRET || 'vira_jwt_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
}

// CORS Configs
export const corsConfig = {
  whitelist: process.env.CORS_WHITELIST?.split(',') || [],
}

// Email Configs
export const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: process.env.EMAIL_PORT || 587,
  user: process.env.EMAIL_USER || 'your_email@example.com',
  pass: process.env.EMAIL_PASS || 'your_email_password',
  from: process.env.EMAIL_FROM || 'your_email@example.com',
}

// Upload Configs
export const uploadConfig = {
  dir: process.env.UPLOAD_DIR || 'uploads',
}

