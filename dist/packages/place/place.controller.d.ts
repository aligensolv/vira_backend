import { Request, Response } from "express";
import { PlaceService } from "./place.service";
export declare class PlaceController {
    private readonly placeService;
    constructor(placeService: PlaceService);
    getPlacesHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getActivePlacesHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    createPlaceHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updatePlaceHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deletePlaceHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPlaceHandler: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
}
