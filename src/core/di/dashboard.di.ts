import { DashboardController, DashboardService } from "../../packages/dashboard";
import { placeRepository } from "./place.di";

const dashboardService = new DashboardService(
    placeRepository
)

const dashboardController = new DashboardController(dashboardService)

export {
    dashboardService,
    dashboardController
}