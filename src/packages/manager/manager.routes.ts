import { Router } from "express"
import { managerController } from "../../core/di/manager.di"
import { authMiddleware, authorizeRoles } from "../../core/middlewares/auth.middleware"
import { UserRole } from "@prisma/client"
import { validateSchema } from "../../core/middlewares/validate-schema.middleware"
import { createManagerSchema, updateManagerSchema } from "./manager.schema"

const router = Router()

router.get(
    "/managers", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    managerController.getAllManagersHandler
)

router.get(
    "/managers/:id", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    managerController.getSingleManagerHandler
)

router.post(
    "/managers", 
    authMiddleware,
    authorizeRoles(UserRole.SUPER_ADMIN),
    validateSchema(createManagerSchema),
    managerController.createManagerHandler
)

router.put(
    "/managers/:id", 
    authMiddleware,
    authorizeRoles(UserRole.SUPER_ADMIN),
    validateSchema(updateManagerSchema),
    managerController.updateManagerHandler
)

router.delete(
    "/managers/:id", 
    authMiddleware,
    authorizeRoles(UserRole.SUPER_ADMIN),
    managerController.deleteManagerHandler
)

export default router