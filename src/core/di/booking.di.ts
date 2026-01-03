import { BookingController, BookingRepository, BookingService } from "../../packages/booking";

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)


export {
    bookingController,
    bookingRepository,
    bookingService
}