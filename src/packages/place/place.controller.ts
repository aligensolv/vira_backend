import { Request, Response } from "express";
import { PlaceService } from "./place.service";
import asyncWrapper from "../../lib/async_wrapper";
import { PlaceFilters } from "./place.type";


export class PlaceController {
  private readonly placeService: PlaceService

  constructor(placeService: PlaceService) {
    this.placeService = placeService
  }

  public getPlacesHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { q, status, region_id } = req.query
      
      const data = await this.placeService.getAllPlaces({
        q: q as PlaceFilters['q'],
        status: status as PlaceFilters['status'],
        region_id: region_id as PlaceFilters['region_id']
      });
      res.json({ data });
    }
  );

  public getActivePlacesHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.placeService.getAllActivePlaces();
      res.json({ data });
    }
  );

  public createPlaceHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.placeService.createPlace({ payload: req.body });
      res.json({ data });
    }
  );

  public updatePlaceHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await this.placeService.updatePlace({ id: +id, payload: req.body });
      res.json({ data });
    }
  );

  public deletePlaceHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await this.placeService.deletePlace({ id: +id });
      res.json({ data });
    }
  );

  public getPlaceHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = await this.placeService.getPlace({ id: +id });
      res.json({ data });
    }
  );
}
