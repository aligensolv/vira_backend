import { DashboardController, DashboardService } from "../../packages/dashboard";
import { placeRepository } from "./place.di";
import { regionRepository } from "./region.di";

const dashboardService = new DashboardService(
    placeRepository,
    regionRepository
)

const dashboardController = new DashboardController(dashboardService)

export {
    dashboardService,
    dashboardController
}