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
}