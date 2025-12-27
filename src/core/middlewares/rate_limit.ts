// src/middlewares/security/rateLimitMiddleware.ts

import rateLimit, { RateLimitRequestHandler, Options } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { Request, Response } from 'express';

/**
 * Configuration options for rate limiting
 */
interface RateLimitConfig {
  windowMs?: number;
  max?: number | ((req: Request) => number | Promise<number>);
  message?: string | object;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
  keyGenerator?: (req: Request) => string;
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
  onLimitReached?: (req: Request, res: Response) => void;
  redis?: {
    host: string;
    port: number;
    password?: string;
    db?: number;
  };
}

/**
 * Default rate limit configuration
 */
const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP',
    code: 'RATE_LIMIT_EXCEEDED',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Use IP address as key, but allow for forwarded IPs
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  skipFailedRequests: false,
  skipSuccessfulRequests: false,
};

/**
 * Creates a rate limiting middleware
 * 
 * Rate limiting helps protect against brute-force attacks and API abuse
 * by limiting the number of requests per IP address within a time window.
 * 
 * @param config - Configuration options for rate limiting
 * @returns Express rate limit middleware
 * 
 * @example
 * ```typescript
 * import { rateLimitMiddleware } from './middlewares';
 * 
 * // Basic rate limiting
 * app.use(rateLimitMiddleware({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   max: 100 // limit each IP to 100 requests per windowMs
 * }));
 * 
 * // Stricter rate limiting for auth endpoints
 * app.use('/api/auth', rateLimitMiddleware({
 *   windowMs: 15 * 60 * 1000,
 *   max: 5,
 *   message: 'Too many authentication attempts'
 * }));
 * ```
 */
export function rateLimitMiddleware(config: RateLimitConfig = {}): RateLimitRequestHandler {
  const finalConfig = { ...defaultConfig, ...config };
  
  const options: Partial<Options> = {
    windowMs: finalConfig.windowMs,
    max: finalConfig.max,
    message: finalConfig.message,
    standardHeaders: finalConfig.standardHeaders,
    legacyHeaders: finalConfig.legacyHeaders,
    keyGenerator: finalConfig.keyGenerator,
    skipFailedRequests: finalConfig.skipFailedRequests,
    skipSuccessfulRequests: finalConfig.skipSuccessfulRequests,
    // onLimitReached: finalConfig.onLimitReached,
  };

  // Use Redis store if configuration is provided
  if (finalConfig.redis) {
    const redis = new Redis({
      host: finalConfig.redis.host,
      port: finalConfig.redis.port,
      password: finalConfig.redis.password,
      db: finalConfig.redis.db || 0,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    });

    options.store = new RedisStore({
      sendCommand: (...args: string[]) => redis.call(...args),
    });
  }

  return rateLimit(options);
}

/**
 * Creates different rate limiters for various use cases
 */
export const createRateLimiter = {
  /**
   * General API rate limiter
   */
  api: (max = 1000, windowMs = 15 * 60 * 1000) => rateLimitMiddleware({
    windowMs,
    max,
    message: {
      error: 'API rate limit exceeded',
      code: 'API_RATE_LIMIT_EXCEEDED',
      limit: max,
      window: windowMs / 1000 / 60 + ' minutes'
    }
  }),

  /**
   * Strict rate limiter for authentication endpoints
   */
  auth: (max = 5, windowMs = 15 * 60 * 1000) => rateLimitMiddleware({
    windowMs,
    max,
    message: {
      error: 'Too many authentication attempts',
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: windowMs / 1000 + ' seconds'
    },
    keyGenerator: (req: Request) => {
      // Use both IP and email/username for auth endpoints
      const identifier = req.body?.email || req.body?.username || 'unknown';
      return `${req.ip}-${identifier}`;
    },
    skipSuccessfulRequests: true, // Don't count successful logins
  }),

  /**
   * File upload rate limiter
   */
  upload: (max = 10, windowMs = 60 * 60 * 1000) => rateLimitMiddleware({
    windowMs, // 1 hour
    max,
    message: {
      error: 'Upload rate limit exceeded',
      code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      retryAfter: '1 hour'
    },
    skipFailedRequests: true, // Only count successful uploads
  }),

  /**
   * Password reset rate limiter
   */
  passwordReset: (max = 3, windowMs = 60 * 60 * 1000) => rateLimitMiddleware({
    windowMs, // 1 hour
    max,
    message: {
      error: 'Too many password reset attempts',
      code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
      retryAfter: '1 hour'
    },
    keyGenerator: (req: Request) => {
      const email = req.body?.email || 'unknown';
      return `password-reset-${email}`;
    },
  }),

  /**
   * Email sending rate limiter
   */
  email: (max = 10, windowMs = 60 * 60 * 1000) => rateLimitMiddleware({
    windowMs, // 1 hour
    max,
    message: {
      error: 'Email sending rate limit exceeded',
      code: 'EMAIL_RATE_LIMIT_EXCEEDED',
      retryAfter: '1 hour'
    },
  }),
};