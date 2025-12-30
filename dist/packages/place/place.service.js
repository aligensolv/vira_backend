"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeService = exports.PlaceService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const place_mapper_1 = require("./place.mapper");
const place_repo_1 = require("./place.repo");
const placeRepository = new place_repo_1.PlaceRepository();
class PlaceService {
    getAllPlaces = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await placeRepository.findMany();
        return resolve(result.map(place_mapper_1.toPlaceDTO));
    });
    getAllActivePlaces = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await placeRepository.findMany({
            is_active: true
        });
        return resolve(result.map(place_mapper_1.toPlaceDTO));
    });
    getPlacesByRegion = async (region_id) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await placeRepository.findMany({
            region_id
        });
        return resolve(result.map(place_mapper_1.toPlaceDTO));
    });
    createPlace = async ({ payload }) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await placeRepository.insert(payload);
        return resolve((0, place_mapper_1.toPlaceDTO)(result));
    });
    updatePlace = async ({ id, payload }) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await placeRepository.updateById(id, payload);
        return resolve((0, place_mapper_1.toPlaceDTO)(result));
    });
    deletePlace = async ({ id }) => (0, promise_wrapper_1.default)(async (resolve) => {
        await placeRepository.removeById(id);
        return resolve(null);
    });
    getPlace = async ({ id }) => (0, promise_wrapper_1.default)(async (resolve) => {
        const place = await placeRepository.findById(id);
        return resolve(place);
    });
}
exports.PlaceService = PlaceService;
exports.placeService = new PlaceService();
