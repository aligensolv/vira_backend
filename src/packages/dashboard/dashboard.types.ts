interface DashboardMetrics {
  totalRevenue: number
  activeSpots: number
  regions_count: number
  totalBookings: number
  pendingBookings: number
  revenueTrend: number[] // For chart
  bookingsByStatus: {
    confirmed: number
    pending: number
    cancelled: number
  }
}

export { type DashboardMetrics }