interface DashboardMetrics {
    totalRevenue: number;
    activeSpots: number;
    regions_count: number;
    totalBookings: number;
    pendingBookings: number;
    revenueTrend: number[];
    bookingsByStatus: {
        confirmed: number;
        pending: number;
        cancelled: number;
    };
}
export { type DashboardMetrics };
