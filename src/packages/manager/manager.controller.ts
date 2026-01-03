import asyncWrapper from "../../lib/async_wrapper";
import { ManagerService } from "./manager.service";

export class ManagerController {
  private readonly managerService: ManagerService

  constructor(managerService: ManagerService) {
    this.managerService = managerService
  }

  public getAllManagersHandler = asyncWrapper(
    async (req, res) => {
      const data = await this.managerService.getAllManagers();
      
      res.json({ data });
    }
  )

  public getSingleManagerHandler = asyncWrapper(
    async (req, res) => {
      const { id } = req.params
      const data = await this.managerService.getSingleManager(+id);
      res.json({ data });
    }
  )

  public createManagerHandler = asyncWrapper(
    async (req, res) => {
      const { body } = req;
      console.log(body);
      
      const data = await this.managerService.createManager(body);
      res.json({ data });
    }
  )

  public updateManagerHandler = asyncWrapper(
    async (req, res) => {
      const { id } = req.params;
      const { body } = req;
      const data = await this.managerService.updateManager(+id, body);
      res.json({ data });
    }
  )

  public deleteManagerHandler = asyncWrapper(
    async (req, res) => {
      const { id } = req.params;
      const data = await this.managerService.deleteManager(+id);
      res.json({ data });
    }
  )
}