"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_di_1 = require("../../core/di/dashboard.di");
const router = (0, express_1.Router)();
router.get("/dashboard/metrics", dashboard_di_1.dashboardController.getDashboardMetricsHandler);
exports.default = router;
