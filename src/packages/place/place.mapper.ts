import type { Place } from "@prisma/client";
import type { PlaceDTO } from "./place.dto";

// Transform DB result to DTO
export function toPlaceDTO(entity: Place): PlaceDTO {
  return entity;
}

