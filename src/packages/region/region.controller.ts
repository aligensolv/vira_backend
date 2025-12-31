import { Request, Response } from "express";
import { RegionService } from "./region.service";
import asyncWrapper from "../../lib/async_wrapper";




export class RegionController {
  private readonly regionService: RegionService

  constructor(regionService: RegionService) {
    this.regionService = regionService;
  }

  public getRegionsHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.regionService.getAllRegions();
      res.json(data);
    }
  )

  public createRegionHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const data = await this.regionService.createRegion(req.body);
      res.json({ data });
    }
  )

  public deleteRegionHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params
      const data = await this.regionService.deleteRegion(+id);
      res.json({ data });
    }
  )

  public getSingleRegionHandler = asyncWrapper (
    async (req: Request, res: Response) => {
      const { id } = req.params
      
      const data = await this.regionService.getSingleRegion(+id);
      res.json({ data });
    }
  )

  public updateRegionHandler = asyncWrapper(
    async (req: Request, res: Response) => {
      const { id } = req.params
      const { name } = req.body

      const data = await this.regionService.updateRegion(+id, { name });
      res.json({ data });
    }
  )
}