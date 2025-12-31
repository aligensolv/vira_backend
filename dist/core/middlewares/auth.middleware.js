"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const api_error_1 = require("../../lib/api_error");
const jwt_1 = require("../utils/auth/jwt");
const client_1 = require("../prisma/client");
const cookie_1 = require("../utils/auth/cookie");
const authMiddleware = async (req, res, next) => {
    const client_source = req.headers['x-client-source'];
    const token = client_source == 'web' ? (0, cookie_1.getAuthCookie)(req) : req.headers.authorization;
    console.log(token);
    console.log(client_source);
    if (!token)
        return next(new api_error_1.AuthError("Unauthorized"));
    try {
        const payload = (0, jwt_1.verifyJwtToken)(token);
        console.log(payload);
        if (!payload) {
            throw new api_error_1.AuthError("Unauthorized");
        }
        req.user_id = payload.id;
        next();
    }
    catch {
        next(new api_error_1.AuthError("Unauthorized"));
    }
};
exports.authMiddleware = authMiddleware;
const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        const user = await client_1.prisma.user.findUnique({
            where: {
                id: req.user_id
            }
        });
        if (!user || !allowedRoles.includes(user.role)) {
            return next(new api_error_1.AuthError("Not Authorized"));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
