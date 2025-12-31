import { Router } from "express";
import { dashboardController } from "../../core/di/dashboard.di";

const router = Router();

router.get("/dashboard/metrics", dashboardController.getDashboardMetricsHandler);

export default router;
