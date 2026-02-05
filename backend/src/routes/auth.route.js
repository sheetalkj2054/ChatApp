import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);

// Profile (🔥 uses multer now)
router.put(
  "/update-profile",
  protectRoute,
  upload.single("image"),
  updateProfile
);

// Check auth
router.get("/check", protectRoute, checkAuth);

export default router;
