import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { initSocket } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


// 🔹 Core middlewares
// middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


// 🔹 CORS (FIXED & SAFE)
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running");
});
// 🔹 API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 🔹 Initialize Socket.IO on SAME server
export const io = initSocket(server);

// 🔹 Start server ONLY after DB connects
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
