import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const FRONTEND_URL = process.env.FRONTEND_URL;

// ✅ Basic middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup with dynamic origin check
app.use(
  cors({
    origin: FRONTEND_URL, // must be exactly your deployed frontend
    credentials: true,
  })
);

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Optional: Serve frontend if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// ✅ Start server after DB connect
server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
