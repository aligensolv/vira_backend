"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("./api_error");
const logger_1 = __importDefault(require("../core/utils/logger"));
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            if (error instanceof api_error_1.ApiError) {
                logger_1.default.error(error.message);
                return next(error);
            }
            const custom_error = new api_error_1.InternalServerError(error.message);
            return next(custom_error);
        }
    };
};
exports.default = asyncWrapper;
