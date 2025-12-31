"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class RegionController {
    regionService;
    constructor(regionService) {
        this.regionService = regionService;
    }
    getRegionsHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.regionService.getAllRegions();
        res.json(data);
    });
    createRegionHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.regionService.createRegion(req.body);
        res.json({ data });
    });
    deleteRegionHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.regionService.deleteRegion(+id);
        res.json({ data });
    });
    getSingleRegionHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.regionService.getSingleRegion(+id);
        res.json({ data });
    });
    updateRegionHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const data = await this.regionService.updateRegion(+id, { name });
        res.json({ data });
    });
}
exports.RegionController = RegionController;
