import promiseWrapper from "../../lib/promise_wrapper";
import { toUserDTO } from "../auth";
import { UserRepository } from "./user.repo";

export class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public getAllUsers = async ({ q }: { q?: string }) => promiseWrapper(
    async (resolve) => {
      let users = await this.userRepository.findMany()
      
      if (q) {
        users = users.filter(user => 
          user.name?.toLowerCase().includes(q.toLowerCase()) ||
          user.email?.toLowerCase().includes(q.toLowerCase())
        )
      }
      
      return resolve(
        users.map(toUserDTO)
      );
    }
  )
}
