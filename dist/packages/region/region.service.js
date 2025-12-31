"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const region_mapper_1 = require("./region.mapper");
const api_error_1 = require("../../lib/api_error");
class RegionService {
    regionRepository;
    constructor(regionRepository) {
        this.regionRepository = regionRepository;
    }
    getAllRegions = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.regionRepository.findMany();
        return resolve(result.map(region_mapper_1.toRegionDTO));
    });
    createRegion = async (payload) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await this.regionRepository.insert(payload);
        return resolve((0, region_mapper_1.toRegionDTO)(result));
    });
    deleteRegion = async (id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const isRegionExists = await this.regionRepository.exists(id);
        if (!isRegionExists) {
            const error = new api_error_1.NotFoundError("No region found to be deleted");
            return reject(error);
        }
        await this.regionRepository.removeById(id);
        return resolve(true);
    });
    getSingleRegion = async (id) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const isRegionExists = await this.regionRepository.exists(id);
        if (!isRegionExists) {
            const error = new api_error_1.NotFoundError("No region was found");
            return reject(error);
        }
        const region = await this.regionRepository.findById(id);
        return resolve((0, region_mapper_1.toRegionDTO)(region));
    });
    updateRegion = async (id, payload) => (0, promise_wrapper_1.default)(async (resolve, reject) => {
        const isRegionExists = await this.regionRepository.search({ id });
        if (!isRegionExists) {
            const error = new api_error_1.NotFoundError("No region found to be updated");
            return reject(error);
        }
        const isNameDuplicated = await this.regionRepository.search({ name: payload.name });
        if (isNameDuplicated) {
            const error = new api_error_1.ConflictError("Region name already exists");
            return reject(error);
        }
        const result = await this.regionRepository.updateById(id, payload);
        return resolve((0, region_mapper_1.toRegionDTO)(result));
    });
}
exports.RegionService = RegionService;
