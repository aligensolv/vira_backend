"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const user_mapper_1 = require("./user.mapper");
const user_repo_1 = require("./user.repo");
const api_error_1 = require("../../lib/api_error");
const error_codes_1 = require("../../lib/error_codes");
const status_codes_1 = require("../../lib/status_codes");
const password_1 = require("../../core/utils/auth/password");
const jwt_1 = require("../../core/utils/auth/jwt");
const userRepo = new user_repo_1.UserRepository();
class UserService {
    getAllUsers = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await userRepo.findMany();
        return resolve(result.map(user_mapper_1.toUserDTO));
    });
    registerUser = async (data) => (0, promise_wrapper_1.default)(async (resolve) => {
        const encrypted_password = await (0, password_1.hashPassword)(data.password);
        const result = await userRepo.insert({
            ...data,
            password: encrypted_password
        });
        return resolve((0, user_mapper_1.toUserDTO)(result));
    });
    loginUser = async ({ email, password }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const user = await userRepo.findOne({
            email: email
        });
        if (!user) {
            const error = new api_error_1.ApiError("Email was not found", error_codes_1.ErrorCode.NOT_FOUND, status_codes_1.StatusCode.NOT_FOUND);
            throw error;
            // return reject(error)
        }
        if (!await (0, password_1.verifyPassword)(password, user.password)) {
            const error = new api_error_1.ApiError("Password is incorrect");
            return reject(error);
        }
        const token = (0, jwt_1.generateToken)({
            id: user.id,
            name: user.name,
            email: user.email
        });
        return resolve({
            user: (0, user_mapper_1.toUserDTO)(user),
            token
        });
    });
}
exports.UserService = UserService;
exports.userService = new UserService();
