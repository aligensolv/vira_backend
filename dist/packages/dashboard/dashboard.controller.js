"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getDashboardMetricsHandler = (0, async_wrapper_1.default)(async (_, res) => {
        const data = await this.dashboardService.getDashboardMetrics();
        res.json({ data });
    });
}
exports.DashboardController = DashboardController;
