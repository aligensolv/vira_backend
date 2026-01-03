import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardMetricsHandler: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>;
}
