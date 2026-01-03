import { AuthController, AuthRepository, AuthService } from "../../packages/auth"

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

export {
    authRepository,
    authService,
    authController
}