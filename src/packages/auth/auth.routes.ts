import { Router } from "express";
import { authController } from "../../core/di";
import { authMiddleware } from "../../core/middlewares/auth.middleware";
import { validateData } from "../../core/middlewares/validate-data.middleware";
import { loginUserSchema, registerUserSchema } from "./auth.schema";

const router = Router();

router.get(
    "/auth/me", 
    authMiddleware,
    authController.getCurrentUserHandler
);

router.post(
    '/auth/login', 
    validateData(loginUserSchema), 
    authController.loginUserHandler
)

router.post(
    '/auth/logout', 
    authMiddleware, 
    authController.loginUserHandler
)

router.post(
    '/auth/register', 
    validateData(registerUserSchema),
    authController.registerUserHandler
)

export default router;