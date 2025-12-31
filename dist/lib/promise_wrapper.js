"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("./api_error");
const promiseWrapper = (fn) => {
    return new Promise((resolve, reject) => {
        fn(resolve, reject).catch((error) => {
            const custom_error = new api_error_1.InternalServerError(error.message);
            reject(custom_error);
        });
    });
};
exports.default = promiseWrapper;
