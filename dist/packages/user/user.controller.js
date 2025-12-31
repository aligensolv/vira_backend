"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandler = getUsersHandler;
const user_service_1 = __importDefault(require("./user.service"));
async function getUsersHandler(req, res) {
    const data = await user_service_1.default.getAllUsers();
    res.json({ data });
}
