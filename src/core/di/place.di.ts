import { PlaceController, PlaceRepository, PlaceService } from "../../packages/place";

const placeRepository = new PlaceRepository()
const placeService = new PlaceService(placeRepository)
const placeController = new PlaceController(placeService)


export {
    placeController,
    placeRepository,
    placeService
}