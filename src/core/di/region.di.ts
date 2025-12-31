import { RegionController, RegionRepository, RegionService } from "../../packages/region"

const regionRepository = new RegionRepository()
const regionService = new RegionService(regionRepository)
const regionController = new RegionController(regionService)

export {
    regionController,
    regionRepository,
    regionService
}