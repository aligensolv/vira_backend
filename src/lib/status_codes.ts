/**
 * HTTP status codes
 * @enum {number}
 * @constant
 * @readonly
 */
export const StatusCode = Object.freeze({
    /**
     * The request was successful.
     * @constant
     * @type {number}
     */
    OK: 200,

    /**
     * The request resulted in a new resource being created.
     * @constant
     * @type {number}
     */
    CREATED: 201,

    /**
     * The server successfully processed the request and is not returning any content.
     * @constant
     * @type {number}
     */
    NO_CONTENT: 204,

    /**
     * The requested resource has not been modified since the given version was available.
     * @constant
     * @type {number}
     */
    NOT_CHANGED: 304,

    /**
     * The server cannot or will not process the request due to an apparent client error.
     * @constant
     * @type {number}
     */
    BAD_REQUEST: 400,

    /**
     * Authentication is possible but has failed or not yet been provided.
     * @constant
     * @type {number}
     */
    NOT_AUTHORIZED: 401,

    /**
     * The request was legitimate, but the server is refusing action.
     * This status code is often used with actions that require an additional step.
     * @constant
     * @type {number}
     */
    FORBIDDEN: 403,

    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     * @constant
     * @type {number}
     */
    NOT_FOUND: 404,

    /**
     * The request conflicts with an existing resource.
     * @constant
     * @type {number}
     */
    CONFLICT: 409,

    /**
     * The request was well-formed but was unable to be followed due to semantic errors.
     * @constant
     * @type {number}
     */
    UNPROCESSABLE_ENTITY: 422,

    /**
     * An unexpected condition was encountered and no more specific message is suitable.
     * @constant
     * @type {number}
     */
    INTERNAL_SERVER_ERROR: 500,

    /**
     * The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
     * @constant
     * @type {number}
     */
    SERVICE_UNAVAILABLE: 503,
})


export type StatusCodeType = typeof StatusCode[keyof typeof StatusCode];
