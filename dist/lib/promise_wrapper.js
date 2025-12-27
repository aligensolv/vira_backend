"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("./api_error");
const status_codes_1 = require("./status_codes");
const error_codes_1 = require("./error_codes");
const promiseWrapper = (fn) => {
    return new Promise((resolve, reject) => {
        fn(resolve, reject).catch((error) => {
            const custom_error = new api_error_1.ApiError(error.message, error_codes_1.ErrorCode.INTERNAL_SERVER_ERROR, status_codes_1.StatusCode.INTERNAL_SERVER);
            reject(custom_error);
        });
    });
};
exports.default = promiseWrapper;
