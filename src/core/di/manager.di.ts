import { ManagerController, ManagerRepository, ManagerService } from "../../packages/manager";

const managerRepository = new ManagerRepository()
const managerService = new ManagerService(managerRepository)

const managerController = new ManagerController(managerService)


export {
    managerRepository,
    managerController,
    managerService
}