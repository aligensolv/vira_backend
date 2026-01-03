"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const async_wrapper_1 = __importDefault(require("../../lib/async_wrapper"));
class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    getBookingsHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.bookingService.getAllBookings();
        res.json({ data });
    });
    getUserBookingsHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const data = await this.bookingService.listUserBookings(req.user_id);
        res.json({ data });
    });
    getSingleBookingHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id } = req.params;
        const data = await this.bookingService.getSingleBooking(+id);
        res.json({ data });
    });
    createBookingHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const user_id = req.user_id;
        const { place_id, start_time, requested_duration_minutes } = req.body;
        const data = await this.bookingService.createBooking(user_id, place_id, new Date(start_time), requested_duration_minutes);
        res.json({ data });
    });
    extendBookingHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id: booking_id } = req.params;
        const { extra_minutes } = req.body;
        const booking = await this.bookingService.extendBooking(+booking_id, extra_minutes);
        res.json({ booking });
    });
    cancelBookingHandler = (0, async_wrapper_1.default)(async (req, res) => {
        const { id: booking_id } = req.params;
        const booking = await this.bookingService.cancelBooking(+booking_id);
        res.json({ booking });
    });
}
exports.BookingController = BookingController;
