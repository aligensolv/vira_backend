import promiseWrapper from "../../lib/promise_wrapper";
import { PlaceRepository } from "../place";
import { RegionRepository } from "../region";
import { DashboardMetrics } from "./dashboard.types";


export class DashboardService {
  private readonly placeRepository: PlaceRepository
  private readonly regionRepository: RegionRepository

  constructor(placeRepository: PlaceRepository, regionRepository: RegionRepository) {
    this.placeRepository = placeRepository
    this.regionRepository = regionRepository
  }

  public getDashboardMetrics = async () => promiseWrapper(
    async (resolve) => {
      const spots = await this.placeRepository.count({ is_active: true })

      const regions_count = await this.regionRepository.count()

      const metrics = {
        activeSpots: spots,
        regions_count,
        bookingsByStatus: {
          cancelled: 0,
          confirmed: 0,
          pending: 0,
        },
        pendingBookings: 0,
        revenueTrend: [
          0, 1, 2, 3, 4, 5
        ],

        totalBookings: 0,
        totalRevenue: 0
      } satisfies DashboardMetrics

      return resolve(metrics)
    }
  )
}