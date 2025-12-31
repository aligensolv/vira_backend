"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const api_error_1 = require("../../lib/api_error");
const password_1 = require("../../core/utils/auth/password");
const jwt_1 = require("../../core/utils/auth/jwt");
const _1 = require(".");
class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    loginUser = async ({ email, password }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            const userNotFoundError = new api_error_1.AuthError("No user was found with this email");
            return reject(userNotFoundError);
        }
        const is_password_valid = await (0, password_1.isPasswordValid)({
            hashed: user.password,
            plain: password
        });
        if (!is_password_valid) {
            const passwordNotMatchError = new api_error_1.AuthError("Password is incorrect");
            return reject(passwordNotMatchError);
        }
        const access_token = (0, jwt_1.generateAccessToken)(user);
        return resolve({
            user: (0, _1.toUserDTO)(user),
            access_token
        });
    });
    getCurrentUser = async (user_id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const user = await this.authRepository.findUserById(user_id);
        if (!user) {
            const userNotFoundError = new api_error_1.AuthError("No user was found");
            return reject(userNotFoundError);
        }
        return resolve((0, _1.toUserDTO)(user));
    });
    registerUser = async ({ name, email, password }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const hashedPassword = await (0, password_1.generateHashedPassword)(password);
        const search = await this.authRepository.findUserByEmail(email);
        if (search) {
            const userAlreadyExistsError = new api_error_1.AuthError("Email is taken");
            return reject(userAlreadyExistsError);
        }
        const user = await this.authRepository.insert({
            name,
            email,
            password: hashedPassword
        });
        const access_token = (0, jwt_1.generateAccessToken)(user);
        return resolve({
            user: (0, _1.toUserDTO)(user),
            access_token
        });
    });
}
exports.AuthService = AuthService;
