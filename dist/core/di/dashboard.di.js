"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.dashboardService = void 0;
const dashboard_1 = require("../../packages/dashboard");
const place_di_1 = require("./place.di");
const dashboardService = new dashboard_1.DashboardService(place_di_1.placeRepository);
exports.dashboardService = dashboardService;
const dashboardController = new dashboard_1.DashboardController(dashboardService);
exports.dashboardController = dashboardController;
