import z from "zod";
import { NotFoundError } from "../../lib/api_error";
import promiseWrapper from "../../lib/promise_wrapper";
import { toUserDTO } from "../auth";
import { ManagerRepository } from "./manager.repo";
import { createManagerSchema, updateManagerSchema } from "./manager.schema";



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

  public getSingleManager = async (id: number) => promiseWrapper(
    async (resolve, reject) => {
      const result = await this.managerRepository.findUnique({ id })
      if (!result) {
        return reject(new NotFoundError('Manager not found'))
      }
      return resolve(toUserDTO(result));
    }
  )

  public createManager = async (data: z.infer<typeof createManagerSchema>) => promiseWrapper(
    async (resolve) => {
      // if(data.password !== data.password_confirmation){
      //   throw new Error('Password does not match')
      // } 

      const result = await this.managerRepository.insert({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'ADMIN'
      })
      return resolve(toUserDTO(result));
    }
  )

  public deleteManager = async (id: number) => promiseWrapper(
    async (resolve, reject) => {
      const result = await this.managerRepository.deleteById(id)
      if (!result) {
        return reject(new NotFoundError('Manager not found'))
      }
      return resolve(toUserDTO(result));
    }
  )

  public updateManager = async (id: number, data: z.infer<typeof updateManagerSchema>) => promiseWrapper(
    async (resolve, reject) => {
      const result = await this.managerRepository.updateById(id, data)
      if (!result) {
        return reject(new NotFoundError('Manager not found'))
      }
      return resolve(toUserDTO(result));
    }
  )
}
