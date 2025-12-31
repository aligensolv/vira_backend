"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
class DashboardService {
    placeRepository;
    regionRepository;
    constructor(placeRepository, regionRepository) {
        this.placeRepository = placeRepository;
        this.regionRepository = regionRepository;
    }
    getDashboardMetrics = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const spots = await this.placeRepository.count({ is_active: true });
        const regions_count = await this.regionRepository.count();
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
        };
        return resolve(metrics);
    });
}
exports.DashboardService = DashboardService;
