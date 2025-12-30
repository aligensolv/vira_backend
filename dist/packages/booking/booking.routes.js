"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.get("/bookings", booking_controller_1.getBookingsHandler);
router.get("/bookings/:id", booking_controller_1.getBookingHandler);
exports.default = router;
