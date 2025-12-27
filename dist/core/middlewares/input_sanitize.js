"use strict";
// src/middlewares/security/sanitizeInputMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInputMiddleware = sanitizeInputMiddleware;
exports.strictSanitizeMiddleware = strictSanitizeMiddleware;
exports.lenientSanitizeMiddleware = lenientSanitizeMiddleware;
exports.apiSanitizeMiddleware = apiSanitizeMiddleware;
const isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
const validator_1 = __importDefault(require("validator"));
/**
 * Default sanitization configuration
 */
const defaultConfig = {
    sanitizeAllStrings: true,
    removeHTML: true,
    escapeHTML: false, // Don't double-escape if removing HTML
    normalizeEmails: true,
    skipFields: ['password', 'confirmPassword'], // Don't sanitize sensitive fields
    maxLength: 10000, // 10KB max per field
};
/**
 * Sanitizes a single value based on configuration
 */
function sanitizeValue(value, fieldName, config) {
    if (typeof value !== 'string') {
        return value;
    }
    // Skip fields that shouldn't be sanitized
    if (config.skipFields?.includes(fieldName)) {
        return value;
    }
    let sanitized = value;
    // Apply length limits
    if (config.maxLength && sanitized.length > config.maxLength) {
        sanitized = sanitized.substring(0, config.maxLength);
    }
    // Apply custom sanitizer if available
    if (config.customSanitizers?.[fieldName]) {
        sanitized = config.customSanitizers[fieldName](sanitized);
    }
    // Remove or escape HTML
    if (config.removeHTML) {
        sanitized = isomorphic_dompurify_1.default.sanitize(sanitized, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true
        });
    }
    else if (config.escapeHTML) {
        sanitized = validator_1.default.escape(sanitized);
    }
    // Normalize emails
    if (config.normalizeEmails && fieldName.toLowerCase().includes('email')) {
        if (validator_1.default.isEmail(sanitized)) {
            sanitized = validator_1.default.normalizeEmail(sanitized, {
                gmail_lowercase: true,
                gmail_remove_dots: false,
                outlookdotcom_lowercase: true,
                yahoo_lowercase: true,
            }) || sanitized;
        }
    }
    // General string cleaning
    sanitized = sanitized.trim();
    return sanitized;
}
/**
 * Recursively sanitizes an object
 */
function sanitizeObject(obj, config, prefix = '') {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item, index) => sanitizeObject(item, config, `${prefix}[${index}]`));
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        const fieldPath = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value, config, fieldPath);
        }
        else {
            sanitized[key] = sanitizeValue(value, fieldPath, config);
        }
    }
    return sanitized;
}
/**
 * Creates input sanitization middleware
 *
 * This middleware sanitizes user input to prevent XSS attacks, SQL injection,
 * and other security vulnerabilities by cleaning and normalizing input data.
 *
 * @param config - Sanitization configuration options
 * @returns Express middleware function
 *
 * @example
 * ```typescript
 * import { sanitizeInputMiddleware } from './middlewares';
 *
 * // Basic sanitization - clean all string inputs
 * app.use(sanitizeInputMiddleware());
 *
 * // Custom sanitization for specific fields
 * app.use(sanitizeInputMiddleware({
 *   customSanitizers: {
 *     phone: (value) => value.replace(/[^\d+\-\s()]/g, ''),
 *     slug: (value) => value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
 *   },
 *   skipFields: ['password', 'rawContent']
 * }));
 *
 * // Only sanitize specific fields
 * app.use('/api/posts', sanitizeInputMiddleware({
 *   bodyFields: ['title', 'description'],
 *   sanitizeAllStrings: false
 * }));
 * ```
 */
function sanitizeInputMiddleware(config = {}) {
    const finalConfig = { ...defaultConfig, ...config };
    return (req, res, next) => {
        try {
            // Sanitize request body
            if (req.body) {
                if (finalConfig.bodyFields) {
                    // Only sanitize specified fields
                    for (const field of finalConfig.bodyFields) {
                        if (req.body[field] !== undefined) {
                            req.body[field] = sanitizeValue(req.body[field], field, finalConfig);
                        }
                    }
                }
                else if (finalConfig.sanitizeAllStrings) {
                    // Sanitize all string fields
                    req.body = sanitizeObject(req.body, finalConfig);
                }
            }
            // Sanitize query parameters
            if (req.query) {
                if (finalConfig.queryFields) {
                    // Only sanitize specified fields
                    for (const field of finalConfig.queryFields) {
                        if (req.query[field] !== undefined) {
                            req.query[field] = sanitizeValue(req.query[field], field, finalConfig);
                        }
                    }
                }
                else if (finalConfig.sanitizeAllStrings) {
                    // Sanitize all query parameters
                    req.query = sanitizeObject(req.query, finalConfig);
                }
            }
            // Sanitize URL parameters
            if (req.params) {
                if (finalConfig.paramFields) {
                    // Only sanitize specified fields
                    for (const field of finalConfig.paramFields) {
                        if (req.params[field] !== undefined) {
                            req.params[field] = sanitizeValue(req.params[field], field, finalConfig);
                        }
                    }
                }
                else if (finalConfig.sanitizeAllStrings) {
                    // Sanitize all URL parameters
                    req.params = sanitizeObject(req.params, finalConfig);
                }
            }
            next();
        }
        catch (error) {
            // If sanitization fails, log the error and continue
            console.error('Input sanitization error:', error);
            next();
        }
    };
}
/**
 * Strict sanitization for user-generated content
 */
function strictSanitizeMiddleware() {
    return sanitizeInputMiddleware({
        removeHTML: true,
        escapeHTML: false,
        normalizeEmails: true,
        maxLength: 5000,
        customSanitizers: {
            username: (value) => value.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
            slug: (value) => value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'),
            phone: (value) => value.replace(/[^\d+\-\s()]/g, ''),
            url: (value) => validator_1.default.isURL(value) ? value : '',
        },
    });
}
/**
 * Lenient sanitization for content that may contain formatting
 */
function lenientSanitizeMiddleware() {
    return sanitizeInputMiddleware({
        removeHTML: false,
        escapeHTML: true,
        normalizeEmails: true,
        maxLength: 50000, // 50KB for rich content
        customSanitizers: {
            html: (value) => isomorphic_dompurify_1.default.sanitize(value, {
                ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3'],
                ALLOWED_ATTR: [],
            }),
        },
    });
}
/**
 * API-specific sanitization for JSON APIs
 */
function apiSanitizeMiddleware() {
    return sanitizeInputMiddleware({
        sanitizeAllStrings: true,
        removeHTML: true,
        normalizeEmails: true,
        maxLength: 1000, // Smaller limit for API calls
        skipFields: ['password', 'token', 'hash', 'signature'],
    });
}
