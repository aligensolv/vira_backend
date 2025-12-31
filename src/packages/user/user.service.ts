import promiseWrapper from "../../lib/promise_wrapper";
import { toUserDTO } from "../auth";
import { UserRepository } from "./user.repo";

export class UserService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public getAllUsers = async () => promiseWrapper(
    async (resolve) => {
      const result = await this.userRepository.findMany()
      return resolve(
        result.map(toUserDTO)
      );
    }
  )
}
