"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsHandler = getBookingsHandler;
exports.getBookingHandler = getBookingHandler;
const booking_service_1 = require("./booking.service");
const bookingService = new booking_service_1.BookingService();
async function getBookingsHandler(req, res) {
    const data = await bookingService.getAllBookings();
    res.json({ data });
}
async function getBookingHandler(req, res) {
    const { id } = req.params;
    const data = await bookingService.getBooking(+id);
    res.json({ data });
}
