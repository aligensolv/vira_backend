"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class PlaceController {
    placeService;
    constructor(placeService) {
        this.placeService = placeService;
    }
    getPlacesHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { q, status, region_id } = req.query;
        const data = await this.placeService.getAllPlaces({
            q: q,
            status: status,
            region_id: region_id
        });
        res.json({ data });
    });
    getActivePlacesHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.placeService.getAllActivePlaces();
        res.json({ data });
    });
    createPlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.placeService.createPlace({ payload: req.body });
        res.json({ data });
    });
    updatePlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.placeService.updatePlace({ id: +id, payload: req.body });
        res.json({ data });
    });
    deletePlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.placeService.deletePlace({ id: +id });
        res.json({ data });
    });
    getPlaceHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.placeService.getPlace({ id: +id });
        res.json({ data });
    });
}
exports.PlaceController = PlaceController;
