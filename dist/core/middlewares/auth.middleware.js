"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const api_error_1 = require("../../lib/api_error");
const jwt_1 = require("../utils/auth/jwt");
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return next(new api_error_1.AuthError("Unauthorized"));
    try {
        const payload = (0, jwt_1.verifyJwtToken)(token);
        if (!payload) {
            throw new api_error_1.AuthError("Unauthorized");
        }
        req.user_id = payload.id;
        req.user_role = payload.role;
        next();
    }
    catch {
        next(new api_error_1.AuthError("Unauthorized"));
    }
};
exports.authMiddleware = authMiddleware;
const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        if (!allowedRoles.includes(req.user_role)) {
            return next(new api_error_1.AuthError("Not Authorized"));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
