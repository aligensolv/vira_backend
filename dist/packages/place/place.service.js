"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const place_mapper_1 = require("./place.mapper");
const api_error_1 = require("../../lib/api_error");
class PlaceService {
    placeRepository;
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }
    getAllPlaces = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.placeRepository.findMany();
        return resolve(result.map(place_mapper_1.toPlaceDTO));
    });
    getAllActivePlaces = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.placeRepository.findMany({
            is_active: true
        });
        return resolve(result.map(place_mapper_1.toPlaceDTO));
    });
    createPlace = async ({ payload }) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.placeRepository.insert(payload);
        return resolve((0, place_mapper_1.toPlaceDTO)(result));
    });
    updatePlace = async ({ id, payload }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const is_place_exists = await this.placeRepository.exists({ id });
        if (!is_place_exists) {
            const error = new api_error_1.NotFoundError("No region found to be deleted");
            return reject(error);
        }
        const result = await this.placeRepository.updateById(id, payload);
        return resolve((0, place_mapper_1.toPlaceDTO)(result));
    });
    deletePlace = async ({ id }) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const is_place_exists = await this.placeRepository.exists({ id });
        if (!is_place_exists) {
            const error = new api_error_1.NotFoundError("No region found to be deleted");
            return reject(error);
        }
        await this.placeRepository.removeById(id);
        return resolve(null);
    });
    getPlace = async ({ id }) => (0, promise_wrapper_1.default)(async (resolve) => {
        const place = await this.placeRepository.findById(id);
        return resolve(place);
    });
}
exports.PlaceService = PlaceService;
