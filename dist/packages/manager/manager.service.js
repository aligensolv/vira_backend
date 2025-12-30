"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerService = exports.ManagerService = void 0;
const api_error_1 = require("../../lib/api_error");
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const manager_mapper_1 = require("./manager.mapper");
const manager_repo_1 = require("./manager.repo");
const status_codes_1 = require("../../lib/status_codes");
const error_codes_1 = require("../../lib/error_codes");
const password_1 = require("../../core/utils/auth/password");
const jwt_1 = require("../../core/utils/auth/jwt");
const managerRepo = new manager_repo_1.ManagerRepository();
class ManagerService {
    getAllManagers = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await managerRepo.findMany();
        return resolve(result.map(manager_mapper_1.toManagerDTO));
    });
    getManager = async (manager_id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const result = await managerRepo.findOne({ id: manager_id });
        if (!result) {
            const error = new api_error_1.ApiError("Manager was not found", error_codes_1.ErrorCode.NOT_FOUND, status_codes_1.StatusCode.NOT_FOUND);
            return reject(error);
        }
        return resolve((0, manager_mapper_1.toManagerDTO)(result));
    });
    loginManager = async ({ email, password }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const result = await managerRepo.findOne({ email });
        if (!result) {
            const error = new api_error_1.ApiError("Email was not found", error_codes_1.ErrorCode.NOT_FOUND, status_codes_1.StatusCode.NOT_FOUND);
            return reject(error);
        }
        const isMatch = await (0, password_1.verifyPassword)(password, result.password);
        if (!isMatch) {
            const error = new api_error_1.ApiError("Invalid password", error_codes_1.ErrorCode.AUTH_ERROR, status_codes_1.StatusCode.NOT_AUTHORIZED);
            return reject(error);
        }
        const token = (0, jwt_1.generateToken)({
            user: {
                ...Object.fromEntries(Object.entries(result).filter(([key,]) => key != 'password')),
            }
        });
        return resolve({
            manager: (0, manager_mapper_1.toManagerDTO)(result),
            token
        });
    });
}
exports.ManagerService = ManagerService;
exports.managerService = new ManagerService();
