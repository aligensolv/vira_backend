"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const user_mapper_1 = require("./user.mapper");
const user_repo_1 = __importDefault(require("./user.repo"));
class UserService {
    getAllUsers = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await user_repo_1.default.getAllUsers();
        return resolve(result.map(user_mapper_1.toUserDTO));
    });
}
exports.UserService = UserService;
exports.userService = new UserService();
