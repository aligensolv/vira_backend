import { Request, Response } from "express";
import { RegionService } from "./region.service";
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    getRegionsHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    createRegionHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteRegionHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleRegionHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateRegionHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
}
