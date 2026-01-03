import type { Booking } from "@prisma/client";
import type { BookingDTO } from "./booking.dto";
export declare function toBookingDTO(entity: Booking): BookingDTO;
