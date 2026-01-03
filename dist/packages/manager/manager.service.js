"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
const api_error_1 = require("../../lib/api_error");
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const auth_1 = require("../auth");
class ManagerService {
    managerRepository;
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }
    getAllManagers = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.managerRepository.findMany();
        return resolve(result.map(auth_1.toUserDTO));
    });
    getSingleManager = async (id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const result = await this.managerRepository.findUnique({ id });
        if (!result) {
            return reject(new api_error_1.NotFoundError('Manager not found'));
        }
        return resolve((0, auth_1.toUserDTO)(result));
    });
    createManager = async (data) => (0, promise_wrapper_1.default)(async (resolve) => {
        // if(data.password !== data.password_confirmation){
        //   throw new Error('Password does not match')
        // } 
        const result = await this.managerRepository.insert({
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'ADMIN'
        });
        return resolve((0, auth_1.toUserDTO)(result));
    });
    deleteManager = async (id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const result = await this.managerRepository.deleteById(id);
        if (!result) {
            return reject(new api_error_1.NotFoundError('Manager not found'));
        }
        return resolve((0, auth_1.toUserDTO)(result));
    });
    updateManager = async (id, data) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const result = await this.managerRepository.updateById(id, data);
        if (!result) {
            return reject(new api_error_1.NotFoundError('Manager not found'));
        }
        return resolve((0, auth_1.toUserDTO)(result));
    });
}
exports.ManagerService = ManagerService;
