"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionService = exports.RegionService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const region_mapper_1 = require("./region.mapper");
const region_repo_1 = require("./region.repo");
const regionRepo = new region_repo_1.RegionRepository();
class RegionService {
    getAllRegions = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await regionRepo.findMany();
        return resolve(result.map(region_mapper_1.toRegionDTO));
    });
    createRegion = async (payload) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await regionRepo.insert(payload);
        return resolve((0, region_mapper_1.toRegionDTO)(result));
    });
    deleteRegion = async (id) => (0, promise_wrapper_1.default)(async (resolve) => {
        await regionRepo.removeById(id);
        return resolve(true);
    });
    getRegion = async (id) => (0, promise_wrapper_1.default)(async (resolve) => {
        const region = await regionRepo.findById(id);
        return resolve((0, region_mapper_1.toRegionDTO)(region));
    });
    updateRegion = async (id, payload) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await regionRepo.updateById(id, payload);
        return resolve((0, region_mapper_1.toRegionDTO)(result));
    });
}
exports.RegionService = RegionService;
exports.regionService = new RegionService();
