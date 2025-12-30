"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const error_codes_1 = require("../../lib/error_codes");
const status_codes_1 = require("../../lib/status_codes");
const api_error_1 = require("../../lib/api_error");
const jwt_1 = require("../utils/auth/jwt");
const client_1 = require("../prisma/client");
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return next(new api_error_1.ApiError("Unauthorized", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED));
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        if (!payload) {
            throw new api_error_1.ApiError("Unauthorized", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED);
        }
        const user = await client_1.prisma.user.findUnique({ where: { id: payload.user_id } });
        if (!user) {
            throw new api_error_1.ApiError("Unauthorized", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED);
        }
        req.user = user;
        next();
    }
    catch {
        next(new api_error_1.ApiError("Unauthorized", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED));
    }
};
exports.authMiddleware = authMiddleware;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !allowedRoles.includes(user.role)) {
            return next(new api_error_1.ApiError("Not Authorized", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.FORBIDDEN));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
