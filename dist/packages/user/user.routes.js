"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/users", user_controller_1.getUsersHandler);
router.post("/users/login", user_controller_1.loginUserHandler);
router.post("/users/register", user_controller_1.registerUserHandler);
exports.default = router;
