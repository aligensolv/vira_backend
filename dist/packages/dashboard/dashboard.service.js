"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = exports.DashboardService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const booking_1 = require("../booking");
const place_1 = require("../place");
// import { toDashboardDTO } from "./dashboard.mapper";
// import {DashboardRepository} from "./dashboard.repo";
const place_repo = new place_1.PlaceRepository();
const booking_repo = new booking_1.BookingRepository();
// const region_repo = new RegionRepository()
class DashboardService {
    getDashboardMetrics = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const spots = await place_repo.count({ is_active: true });
        const bookings = await booking_repo.findMany();
        const paid_bookings = bookings.filter(booking => {
            return booking.status == 'completed' || booking.status == 'confirmed';
        });
        const metrics = {
            activeSpots: spots,
            bookingsByStatus: {
                cancelled: bookings.filter(b => b.status == 'cancelled').length,
                confirmed: bookings.filter(b => b.status == 'confirmed').length,
                pending: bookings.filter(b => b.status == 'pending').length,
            },
            pendingBookings: bookings.filter(b => b.status == 'pending').length,
            revenueTrend: [
                0, 1, 2, 3, 4, 5
            ],
            totalBookings: bookings.length,
            totalRevenue: paid_bookings.reduce((prev, next) => {
                return prev + next.total_price;
            }, 0)
        };
        return resolve(metrics);
    });
}
exports.DashboardService = DashboardService;
exports.dashboardService = new DashboardService();
