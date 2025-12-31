"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const auth_1 = require("../auth");
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.userRepository.findMany();
        return resolve(result.map(auth_1.toUserDTO));
    });
}
exports.UserService = UserService;
