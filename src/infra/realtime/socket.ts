// src/realtime/socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_place", (place_id: number) => {
      console.log(`Socket ${socket.id} joined place ${place_id}`);
      
      socket.join(`place:${place_id}`);
    });

    socket.on("leave_place", (place_id: number) => {
      console.log(`Socket ${socket.id} left place ${place_id}`);

      socket.leave(`place:${place_id}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}
