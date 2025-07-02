import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Read from env
const FRONTEND_URL = process.env.FRONTEND_URL;

// ✅ Setup Socket.IO with strict CORS
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

// ✅ Store userId -> socketId mapping
const userSocketMap = {};

// Export helper
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// ✅ Socket.IO connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId} => ${socket.id}`);
  }

  // Send updated online users to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
