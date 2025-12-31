"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerService = void 0;
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
}
exports.ManagerService = ManagerService;
