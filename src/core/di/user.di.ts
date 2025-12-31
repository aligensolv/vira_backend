import { UserController, UserRepository, UserService } from "../../packages/user";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)


export {
    userController,
    userRepository,
    userService
}