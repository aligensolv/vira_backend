import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
/**
 * Configuration options for not found middleware
 */
export interface NotFoundOptions {
    logger?: Logger;
    message?: string;
    includeRequestInfo?: boolean;
    suggestAlternatives?: boolean;
    trackMetrics?: boolean;
    customResponse?: (req: Request, res: Response) => void;
    excludePaths?: string[];
    includeCORS?: boolean;
}
/**
 * Not Found Middleware (404 Handler)
 *
 * Handles requests to undefined routes with helpful error messages.
 * Can suggest similar endpoints and track 404 metrics for monitoring.
 *
 * @param options - Configuration options
 * @returns Express middleware function
 *
 * @example
 * ```typescript
 * import { notFoundMiddleware } from './middlewares/validation/notFoundMiddleware';
 *
 * // Should be registered as the last middleware
 * app.use(notFoundMiddleware({
 *   logger: winston.createLogger(...),
 *   suggestAlternatives: true,
 *   includeRequestInfo: true,
 *   trackMetrics: true
 * }));
 * ```
 */
export declare const notFoundMiddleware: (options?: NotFoundOptions) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Get 404 metrics for monitoring
 * Returns the most frequently requested missing routes
 */
/**
 * Advanced 404 middleware with route registration tracking
 * This version can track registered routes and provide better suggestions
 */
export declare class RouteTracker {
    private registeredRoutes;
    private routePatterns;
    /**
     * Register a route pattern
     */
    registerRoute(method: string, path: string): void;
    /**
     * Find similar registered routes
     */
    findSimilarRoutes(method: string, requestedPath: string): string[];
    /**
     * Check if a route matches any registered pattern
     */
    matchesPattern(method: string, path: string): boolean;
}
/**
 * Create not found middleware with route tracking
 */
export declare const createAdvancedNotFoundMiddleware: (routeTracker: RouteTracker, options?: NotFoundOptions) => (req: Request, res: Response, next: NextFunction) => void;
