import { Router } from "express"
import { managerController } from "../../core/di/manager.di"

const router = Router()

router.get("/managers", managerController.getAllManagersHandler)
export default router
