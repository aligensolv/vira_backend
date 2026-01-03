import { Router } from "express"
import { bookingController } from "../../core/di/booking.di"
import { authMiddleware, authorizeRoles } from "../../core/middlewares/auth.middleware"
import { UserRole } from "@prisma/client"


const router = Router()

router.get(
    "/bookings", 
    authMiddleware,
    authorizeRoles(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    bookingController.getBookingsHandler
)

router.get(
    "/bookings/me", 
    authMiddleware,
    bookingController.getUserBookingsHandler
)

router.get(
    "/bookings/:id", 
    authMiddleware,
    bookingController.getSingleBookingHandler
)

router.post(
    '/bookings', 
    authMiddleware,
    bookingController.createBookingHandler
)

router.post(
    '/bookings/:id/extend', 
    authMiddleware,
    bookingController.extendBookingHandler
)
router.post(
    '/bookings/:id/cancel', 
    authMiddleware,
    bookingController.cancelBookingHandler
)


export default router
