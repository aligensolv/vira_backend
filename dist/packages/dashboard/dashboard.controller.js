"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetricsHandler = getDashboardMetricsHandler;
const dashboard_service_1 = require("./dashboard.service");
const dashboard_service = new dashboard_service_1.DashboardService();
async function getDashboardMetricsHandler(req, res) {
    const data = await dashboard_service.getDashboardMetrics();
    res.json({ data });
}
