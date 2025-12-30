"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserHandler = void 0;
exports.getUsersHandler = getUsersHandler;
exports.registerUserHandler = registerUserHandler;
const user_service_1 = require("./user.service");
const user_schema_1 = require("./user.schema");
const api_error_1 = require("../../lib/api_error");
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
async function getUsersHandler(req, res) {
    const data = await user_service_1.userService.getAllUsers();
    res.json({ data });
}
async function registerUserHandler(req, res, next) {
    const payload = req.body;
    const parsing = user_schema_1.createUserSchema.safeParse(payload);
    if (parsing.success == false) {
        const error = new api_error_1.ApiError("data is missing", "VALIDATION_ERROR", 400, []);
        return next(error);
    }
    const user = await user_service_1.userService.registerUser(payload);
    res.json(user);
}
exports.loginUserHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await user_service_1.userService.loginUser({ email, password });
    console.log(user);
    res.json(user);
});
