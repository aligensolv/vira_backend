"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class ManagerController {
    managerService;
    constructor(managerService) {
        this.managerService = managerService;
    }
    getAllManagersHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.managerService.getAllManagers();
        res.json({ data });
    });
}
exports.ManagerController = ManagerController;
