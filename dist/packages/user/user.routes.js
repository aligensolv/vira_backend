"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_di_1 = require("../../core/di/user.di");
const router = (0, express_1.Router)();
router.get("/users", user_di_1.userController.getAllUsersHandler);
exports.default = router;
