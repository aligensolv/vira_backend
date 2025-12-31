import promiseWrapper from "../../lib/promise_wrapper";
import { toUserDTO } from "../auth";
import { ManagerRepository } from "./manager.repo";



export class ManagerService {
  private readonly managerRepository: ManagerRepository

  constructor(managerRepository: ManagerRepository){
    this.managerRepository = managerRepository
  }

  public getAllManagers = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.managerRepository.findMany()
      return resolve(
        result.map(toUserDTO)
      );
    }
  )
}
