"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = setAuthCookie;
exports.clearAuthCookie = clearAuthCookie;
exports.getAuthCookie = getAuthCookie;
function setAuthCookie(res, token) {
    return res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
}
function clearAuthCookie(res) {
    return res.clearCookie("access_token");
}
function getAuthCookie(req) {
    return req.cookies.access_token;
}
