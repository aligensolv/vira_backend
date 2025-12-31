import asyncWrapper from "../../lib/async_wrapper";
import { UserService } from "./user.service";

export class UserController {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public getAllUsersHandler = asyncWrapper(
    async (_, res) => {
      const data = await this.userService.getAllUsers();
      res.json({ data });
    }
  )
}