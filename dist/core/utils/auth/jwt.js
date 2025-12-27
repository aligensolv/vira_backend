"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
// src/utils/auth/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_configs_1 = require("../../config/server_configs");
function generateToken(payload, expiresIn = server_configs_1.securityConfig.jwtExpiresIn) {
    return jsonwebtoken_1.default.sign(payload, server_configs_1.securityConfig.jwtSecret, { expiresIn });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, server_configs_1.securityConfig.jwtSecret);
    }
    catch {
        return null;
    }
}
function decodeToken(token) {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
}
