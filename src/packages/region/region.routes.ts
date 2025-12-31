import { Router } from "express"
import { authMiddleware, authorizeRoles } from "../../core/middlewares/auth.middleware"
import { validateSchema } from "../../core/middlewares/validate-schema.middleware"
import { createRegionSchema, updateRegionSchema } from "./region.schema"
import { UserRole } from "@prisma/client"
import { regionController } from "../../core/di/region.di"

const router = Router()


router.get(
    "/regions", 
    authMiddleware, 
    regionController.getRegionsHandler
)

router.get(
    "/regions/:id", 
    authMiddleware,
    regionController.getSingleRegionHandler
)

router.post(
    "/regions", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateSchema(createRegionSchema),
    regionController.createRegionHandler
)

router.put(
    "/regions/:id", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateSchema(updateRegionSchema),
    regionController.updateRegionHandler
)

router.delete(
    "/regions/:id",
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    regionController.deleteRegionHandler
)

export default router