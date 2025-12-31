"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsersHandler = (0, async_wrapper_1.default)(async (_, res) => {
        const data = await this.userService.getAllUsers();
        res.json({ data });
    });
}
exports.UserController = UserController;
