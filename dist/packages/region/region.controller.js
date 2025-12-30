"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionsHandler = getRegionsHandler;
exports.createRegionsHandler = createRegionsHandler;
exports.deleteRegionsHandler = deleteRegionsHandler;
exports.getRegionHandler = getRegionHandler;
exports.updateRegionHandler = updateRegionHandler;
const region_service_1 = require("./region.service");
const region_schema_1 = require("./region.schema");
const regionService = new region_service_1.RegionService();
async function getRegionsHandler(req, res) {
    const data = await regionService.getAllRegions();
    res.json({ data });
}
async function createRegionsHandler(req, res) {
    const parsing = region_schema_1.createRegionSchema.safeParse(req.body);
    if (!parsing.success) {
        return res.status(400).json({ error: parsing.error });
    }
    const data = await regionService.createRegion(req.body);
    res.json({ data });
}
async function deleteRegionsHandler(req, res) {
    const { id } = req.params;
    const data = await regionService.deleteRegion(+id);
    res.json({ data });
}
async function getRegionHandler(req, res) {
    const { id } = req.params;
    const data = await regionService.getRegion(+id);
    res.json({ data });
}
async function updateRegionHandler(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    console.log(id);
    console.log(req.body);
    const data = await regionService.updateRegion(+id, {
        name
    });
    res.json({ data });
}
