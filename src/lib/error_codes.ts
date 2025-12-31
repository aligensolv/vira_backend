/**
 * Error codes for API errors
 * @enum {string}
 */
export const ErrorCode = Object.freeze({
  /**
   * Internal Server Error (500)
   * Use when an unexpected error occurs on the server-side
   */
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  /**
   * Validation Error (400)
   * Use when a request payload contains invalid data
   */
  VALIDATION_ERROR: "VALIDATION_ERROR",
  /**
   * Bad Request (400)
   * Use when a request is invalid or cannot be processed
   */
  BAD_REQUEST: "BAD_REQUEST",
  /**
   * Authentication Error (401)
   * Use when a request lacks valid authentication credentials
   */
  AUTH_ERROR: "AUTH_ERROR",
  /**
   * Not Found (404)
   * Use when a requested resource cannot be found
   */
  NOT_FOUND: "NOT_FOUND",
  /**
   * Duplication Error (409)
   * Use when a request payload contains duplicate data
   */
  DUPLICATION_ERROR: "DUPLICATION_ERROR",
  /**
   * Unauthorized (401)
   * Use when a request lacks valid authorization credentials
   */
  UNAUTHORIZED: "UNAUTHORIZED",
  /**
   * Forbidden (403)
   * Use when a request lacks valid permission credentials
   */
  FORBIDDEN: "FORBIDDEN",
  /**
   * Conflict (409)
   * Use when a request payload contains conflicting data
   */
  CONFLICT: "CONFLICT",
  /**
   * Rate Limit Exceeded (429)
   * Use when a request exceeds the API rate limit
   */
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  /**
   * Service Unavailable (503)
   * Use when an external service is unavailable
   */
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
});