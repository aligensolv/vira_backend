"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
// src/realtime/socket.ts
const socket_io_1 = require("socket.io");
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        socket.on("join_place", (place_id) => {
            console.log(`Socket ${socket.id} joined place ${place_id}`);
            socket.join(`place:${place_id}`);
        });
        socket.on("leave_place", (place_id) => {
            console.log(`Socket ${socket.id} left place ${place_id}`);
            socket.leave(`place:${place_id}`);
        });
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
    return io;
}
