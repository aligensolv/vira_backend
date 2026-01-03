// src/modules/bookings/booking.rules.ts

export function calculateEndTime(
  startTime: Date,
  durationMin: number
): Date {
  return new Date(startTime.getTime() + durationMin * 60_000);
}

export function calculatePrice(
  durationMin: number,
  pricePerHour: number
): number {
  const hours = Math.ceil(durationMin / 60);
  return hours * pricePerHour;
}

export function canCancelBooking(startTime: Date): boolean {
  return new Date() < startTime;
}

export function canUpdateBooking(startTime: Date): boolean {
  return new Date() < startTime;
}