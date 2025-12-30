"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthMiddleware = void 0;
const error_codes_1 = require("../../lib/error_codes");
const status_codes_1 = require("../../lib/status_codes");
const api_error_1 = require("../../lib/api_error");
const jwt_1 = require("../../core/utils/auth/jwt");
const checkAuthMiddleware = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json(new api_error_1.ApiError('Unauthorized', error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED));
    }
    const decodedToken = (0, jwt_1.verifyToken)(token);
    if (!decodedToken || decodedToken.role !== 'manager') {
        return res.status(401).json(new api_error_1.ApiError('Unauthorized', error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED));
    }
    req.manager = decodedToken;
    next();
};
exports.checkAuthMiddleware = checkAuthMiddleware;
