import type { Booking } from "@prisma/client";
import type { BookingDTO } from "./booking.dto";

// Transform DB result to DTO
export function toBookingDTO(entity: Booking): BookingDTO {
  return entity;
}
