// src/middlewares/auth/roleMiddleware.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Role configuration options
 */
interface RoleConfig {
  /**
   * Required roles (user must have at least one)
   */
  roles?: string[];
  /**
   * Required permissions (user must have at least one)
   */
  permissions?: string[];
  /**
   * Whether to require ALL roles/permissions instead of ANY
   */
  requireAll?: boolean;
  /**
   * Custom authorization function
   */
  customAuthorizer?: (req: Request) => boolean | Promise<boolean>;
  /**
   * Whether to check roles, permissions, or both
   */
  checkType?: 'roles' | 'permissions' | 'both';
  /**
   * Custom error handler
   */
  errorHandler?: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * Skip authorization for certain conditions
   */
  skip?: (req: Request) => boolean;
}

/**
 * Default role configuration
 */
const defaultConfig: RoleConfig = {
  requireAll: false,
  checkType: 'both',
};

/**
 * Checks if user has required roles
 */
function hasRequiredRoles(userRoles: string[], requiredRoles: string[], requireAll: boolean): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;

  if (requireAll) {
    return requiredRoles.every(role => userRoles.includes(role));
  } else {
    return requiredRoles.some(role => userRoles.includes(role));
  }
}

/**
 * Checks if user has required permissions
 */
function hasRequiredPermissions(userPermissions: string[], requiredPermissions: string[], requireAll: boolean): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  if (!userPermissions || userPermissions.length === 0) return false;

  if (requireAll) {
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  } else {
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  }
}

/**
 * Creates a role-based access control middleware
 * 
 * This middleware enforces role and permission-based authorization
 * by checking if the authenticated user has the required roles or permissions
 * to access a specific resource or endpoint.
 * 
 * @param config - Role configuration options
 * @returns Express middleware function
 * 
 * @example
 * ```typescript
 * import { roleMiddleware } from './middlewares';
 * 
 * // Require admin role
 * app.get('/api/admin/users', 
 *   authMiddleware(),
 *   roleMiddleware({ roles: ['admin'] }),
 *   (req, res) => {
 *     res.json({ users: getAllUsers() });
 *   }
 * );
 * 
 * // Require specific permissions
 * app.post('/api/posts', 
 *   authMiddleware(),
 *   roleMiddleware({ permissions: ['posts:create'] }),
 *   createPost
 * );
 * 
 * // Require multiple roles (user must have ALL)
 * app.delete('/api/critical-data',
 *   authMiddleware(),
 *   roleMiddleware({ 
 *     roles: ['admin', 'super-admin'],
 *     requireAll: true 
 *   }),
 *   deleteCriticalData
 * );
 * 
 * // Custom authorization logic
 * app.get('/api/posts/:id',
 *   authMiddleware(),
 *   roleMiddleware({
 *     customAuthorizer: async (req) => {
 *       const post = await getPost(req.params.id);
 *       return post.authorId === req.user.id || req.user.roles.includes('admin');
 *     }
 *   }),
 *   getPost
 * );
 * ```
 */
export function roleMiddleware(config: RoleConfig = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Skip authorization if configured
      if (finalConfig.skip && finalConfig.skip(req)) {
        return next();
      }

      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
          code: 'UNAUTHENTICATED',
        });
      }

      // Use custom authorizer if provided
      if (finalConfig.customAuthorizer) {
        const isAuthorized = await finalConfig.customAuthorizer(req);
        if (!isAuthorized) {
          if (finalConfig.errorHandler) {
            return finalConfig.errorHandler(req, res, next);
          }
          return res.status(403).json({
            error: 'Insufficient permissions',
            code: 'AUTHORIZATION_FAILED',
          });
        }
        return next();
      }

      let hasAccess = true;

      // Check roles
      if (finalConfig.checkType === 'roles' || finalConfig.checkType === 'both') {
        if (finalConfig.roles && finalConfig.roles.length > 0) {
          const hasRoles = hasRequiredRoles(
            req.user.roles,
            finalConfig.roles,
            finalConfig.requireAll!
          );
          if (!hasRoles) {
            hasAccess = false;
          }
        }
      }

      // Check permissions
      if (finalConfig.checkType === 'permissions' || finalConfig.checkType === 'both') {
        if (finalConfig.permissions && finalConfig.permissions.length > 0) {
          const hasPermissions = hasRequiredPermissions(
            req.user.permissions,
            finalConfig.permissions,
            finalConfig.requireAll!
          );
          if (!hasPermissions) {
            hasAccess = false;
          }
        }
      }

      // Handle access denial
      if (!hasAccess) {
        if (finalConfig.errorHandler) {
          return finalConfig.errorHandler(req, res, next);
        }

        return res.status(403).json({
          error: 'Insufficient permissions',
          code: 'INSUFFICIENT_PERMISSIONS',
          required: {
            roles: finalConfig.roles,
            permissions: finalConfig.permissions,
            requireAll: finalConfig.requireAll,
          },
          user: {
            roles: req.user.roles,
            permissions: req.user.permissions,
          },
        });
      }

      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({
        error: 'Authorization error',
        code: 'AUTHORIZATION_ERROR',
      });
    }
  };
}

/**
 * Convenience middleware for requiring admin role
 */
export function requireAdmin() {
  return roleMiddleware({ roles: ['admin'] });
}

/**
 * Convenience middleware for requiring super admin role
 */
export function requireSuperAdmin() {
  return roleMiddleware({ roles: ['super-admin'] });
}

/**
 * Convenience middleware for requiring any admin role
 */
export function requireAnyAdmin() {
  return roleMiddleware({ roles: ['admin', 'super-admin'] });
}

/**
 * Convenience middleware for requiring multiple roles
 */
export function requireAllRoles(roles: string[]) {
  return roleMiddleware({ roles, requireAll: true });
}

/**
 * Convenience middleware for requiring any of the specified roles
 */
export function requireAnyRole(roles: string[]) {
  return roleMiddleware({ roles, requireAll: false });
}

/**
 * Convenience middleware for requiring specific permissions
 */
export function requirePermissions(permissions: string[], requireAll: boolean = false) {
  return roleMiddleware({ permissions, requireAll, checkType: 'permissions' });
}

/**
 * Resource ownership middleware
 * Allows access if user owns the resource or has admin role
 */
export function requireOwnership(config: {
  resourceIdParam?: string;
  ownerIdField?: string;
  resourceLoader?: (id: string) => Promise<any>;
  adminRoles?: string[];
} = {}) {
  const {
    resourceIdParam = 'id',
    ownerIdField = 'userId',
    resourceLoader,
    adminRoles = ['admin', 'super-admin'],
  } = config;

  return roleMiddleware({
    customAuthorizer: async (req: Request) => {
      // Check if user is admin first
      if (hasRequiredRoles(req.user!.roles, adminRoles, false)) {
        return true;
      }

      const resourceId = req.params[resourceIdParam];
      if (!resourceId) {
        return false;
      }

      if (resourceLoader) {
        try {
          const resource = await resourceLoader(resourceId);
          return resource && resource[ownerIdField] === req.user!.id;
        } catch (error) {
          console.error('Resource loading error:', error);
          return false;
        }
      }

      // If no resource loader, assume the resource ID is the user ID
      return resourceId === req.user!.id;
    },
  });
}

/**
 * Time-based access control middleware
 * Restricts access based on time of day, day of week, etc.
 */
export function timeBasedAccess(config: {
  allowedHours?: [number, number]; // [start, end] in 24h format
  allowedDaysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  allowedMinutes?: [number, number]; // [start, end] in minutes past midnight
}) {
  return roleMiddleware({
    customAuthorizer: (req: Request) => {
      const now = new Date();

      // Check allowed hours
      if (config.allowedHours) {
        const [startHour, endHour] = config.allowedHours;
        const currentHour = now.getHours();
        if (currentHour < startHour || currentHour > endHour) {
          return false;
        }
      }

      // Check allowed days of week
      if (config.allowedDaysOfWeek) {
        const currentDay = now.getDay();
        if (!config.allowedDaysOfWeek.includes(currentDay)) {
          return false;
        }
      }

      // Check allowed minutes
      if (config.allowedMinutes) {
        const [startMinute, endMinute] = config.allowedMinutes;
        const currentMinutes = now.getMinutes();
        if (currentMinutes < startMinute || currentMinutes > endMinute) {
          return false;
        }
      }

      return true;
    },
  });
}
