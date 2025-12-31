import { DashboardService } from "./dashboard.service";
import asyncWrapper from "../../lib/async_wrapper";

export class DashboardController {
  private readonly dashboardService: DashboardService

  constructor(dashboardService: DashboardService) {
    this.dashboardService = dashboardService
  }


  public getDashboardMetricsHandler = asyncWrapper(
    async (_, res) => {
      const data = await this.dashboardService.getDashboardMetrics();
      res.json({ data });
    }
  )
}