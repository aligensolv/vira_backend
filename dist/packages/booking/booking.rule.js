"use strict";
// src/modules/bookings/booking.rules.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEndTime = calculateEndTime;
exports.calculatePrice = calculatePrice;
exports.canCancelBooking = canCancelBooking;
exports.canUpdateBooking = canUpdateBooking;
function calculateEndTime(startTime, durationMin) {
    return new Date(startTime.getTime() + durationMin * 60_000);
}
function calculatePrice(durationMin, pricePerHour) {
    const hours = Math.ceil(durationMin / 60);
    return hours * pricePerHour;
}
function canCancelBooking(startTime) {
    return new Date() < startTime;
}
function canUpdateBooking(startTime) {
    return new Date() < startTime;
}
