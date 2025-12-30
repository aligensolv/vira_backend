"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = exports.BookingService = void 0;
const promise_wrapper_1 = __importDefault(require("../../lib/promise_wrapper"));
const booking_mapper_1 = require("./booking.mapper");
const booking_repo_1 = require("./booking.repo");
const bookingRepo = new booking_repo_1.BookingRepository();
class BookingService {
    getAllBookings = async () => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await bookingRepo.findMany({});
        return resolve(result.map(booking_mapper_1.toBookingDTO));
    });
    getBooking = async (booking_id) => (0, promise_wrapper_1.default)(async (resolve) => {
        const result = await bookingRepo.findById(booking_id);
        return resolve((0, booking_mapper_1.toBookingDTO)(result));
    });
}
exports.BookingService = BookingService;
exports.bookingService = new BookingService();
