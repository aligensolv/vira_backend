"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_di_1 = require("../../core/di/manager.di");
const router = (0, express_1.Router)();
router.get("/managers", manager_di_1.managerController.getAllManagersHandler);
exports.default = router;
