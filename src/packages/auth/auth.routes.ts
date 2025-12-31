import { Router } from "express";
import { authController } from "../../core/di";
import { authMiddleware } from "../../core/middlewares/auth.middleware";
import { validateSchema } from "../../core/middlewares/validate-schema.middleware";
import { loginUserSchema, registerUserSchema } from "./auth.schema";

const router = Router();

router.get(
    "/auth/me", 
    authMiddleware,
    authController.getCurrentUserHandler
);

router.post(
    '/auth/login', 
    validateSchema(loginUserSchema), 
    authController.loginUserHandler
)

router.post(
    '/auth/logout', 
    authMiddleware, 
    authController.logoutUserHandler
)

router.post(
    '/auth/register', 
    validateSchema(registerUserSchema),
    authController.registerUserHandler
)

export default router;