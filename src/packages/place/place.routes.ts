import { Router } from "express"
import { createPlaceSchema } from "./place.schema"
import { authMiddleware, authorizeRoles } from "../../core/middlewares/auth.middleware"
import { UserRole } from "@prisma/client"
import { validateSchema } from "../../core/middlewares/validate-schema.middleware"
import { placeController } from "../../core/di/place.di"

const router = Router()

router.get(
    "/places", 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    placeController.getPlacesHandler
)

router.get(
    "/places/active", 
    authMiddleware,
    placeController.getActivePlacesHandler
)

router.post(
    '/places', 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateSchema(createPlaceSchema), 
    placeController.createPlaceHandler
)

router.get(
    '/places/:id', 
    authMiddleware,
    placeController.getPlaceHandler
)

router.put(
    '/places/:id', 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    placeController.updatePlaceHandler
)

router.delete(
    '/places/:id', 
    authMiddleware,
    authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    placeController.deletePlaceHandler
)

export default router
