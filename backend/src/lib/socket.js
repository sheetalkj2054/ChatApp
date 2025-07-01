import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Read the same FRONTEND_URL you set in Render env
const FRONTEND_URL = process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // allow non-browser clients like mobile apps or CURL
      if (!origin) return callback(null, true);
      if (origin === FRONTEND_URL) return callback(null, true);
      callback(new Error("Socket.IO CORS policy: origin not allowed"), false);
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// used to store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
