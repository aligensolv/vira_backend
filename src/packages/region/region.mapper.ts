import type { Region } from "@prisma/client";
import type { RegionDTO } from "./region.dto";

// Transform DB result to DTO
export function toRegionDTO(entity: Region): RegionDTO {
  return entity
}
