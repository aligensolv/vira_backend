"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = generateJwtToken;
exports.generateAccessToken = generateAccessToken;
exports.verifyJwtToken = verifyJwtToken;
// src/utils/auth/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_configs_1 = require("../../config/server_configs");
function generateJwtToken(payload, expiresIn = server_configs_1.securityConfig.jwtExpiresIn) {
    const options = { expiresIn: expiresIn };
    return jsonwebtoken_1.default.sign(payload, server_configs_1.securityConfig.jwtSecret, options);
}
function generateAccessToken(user) {
    const access_token = generateJwtToken({
        id: user.id,
        role: user.role,
        email: user.email
    });
    return access_token;
}
function verifyJwtToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, server_configs_1.securityConfig.jwtSecret);
    }
    catch {
        return null;
    }
}
