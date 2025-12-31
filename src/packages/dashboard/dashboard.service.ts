import promiseWrapper from "../../lib/promise_wrapper";
import { PlaceRepository } from "../place";
import { DashboardMetrics } from "./dashboard.types";


export class DashboardService {
  private readonly placeRepository: PlaceRepository

  constructor(placeRepository: PlaceRepository) {
    this.placeRepository = placeRepository
  }

  public getDashboardMetrics = async () => promiseWrapper(
    async (resolve) => {
      const spots = await this.placeRepository.count({ is_active: true })


      const metrics = {
        activeSpots: spots,
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