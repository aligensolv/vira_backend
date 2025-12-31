"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    loginUserHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.authService.loginUser(req.body);
        res.json(data);
    });
    registerUserHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.authService.registerUser(req.body);
        res.json(data);
    });
    getCurrentUserHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.authService.getCurrentUser(req.user_id);
        res.json(data);
    });
}
exports.AuthController = AuthController;
