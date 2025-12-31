"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHashedPassword = generateHashedPassword;
exports.isPasswordValid = isPasswordValid;
const argon2_1 = __importDefault(require("argon2"));
async function generateHashedPassword(password, saltRounds = 12) {
    return argon2_1.default.hash(password, { timeCost: saltRounds });
}
async function isPasswordValid({ hashed, plain }) {
    return argon2_1.default.verify(hashed, plain);
}
