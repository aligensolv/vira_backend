import { Router } from "express";
import { userController } from "../../core/di/user.di";


const router = Router();

router.get("/users", userController.getAllUsersHandler);

export default router;
