"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceHandler = exports.deletePlaceHandler = exports.updatePlaceHandler = exports.createPlaceHandler = exports.getPlacesByRegionHandler = exports.getActivePlacesHandler = exports.getPlacesHandler = void 0;
const place_service_1 = require("./place.service");
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
const placeService = new place_service_1.PlaceService();
exports.getPlacesHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const data = await placeService.getAllPlaces();
    res.json({ data });
});
exports.getActivePlacesHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const data = await placeService.getAllActivePlaces();
    res.json({ data });
});
exports.getPlacesByRegionHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = await placeService.getPlacesByRegion(+id);
    res.json({ data });
});
exports.createPlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const data = await placeService.createPlace({ payload: req.body });
    res.json({ data });
});
exports.updatePlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = await placeService.updatePlace({ id: +id, payload: req.body });
    res.json({ data });
});
exports.deletePlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = await placeService.deletePlace({ id: +id });
    res.json({ data });
});
exports.getPlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
    const { id } = req.params;
    const data = await placeService.getPlace({ id: +id });
    res.json({ data });
});
