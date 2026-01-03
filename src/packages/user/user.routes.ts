import { authorizeRoles } from './../../core/middlewares/auth.middleware';
import { Router } from "express";
import { userController } from "../../core/di/user.di";
import { authMiddleware } from "../../core/middlewares/auth.middleware";
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
    "/users", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    userController.getAllUsersHandler
);

export default router;
