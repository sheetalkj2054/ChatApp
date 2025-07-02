import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middleware/multer.middleware.js"; // ✅ use your configured multer

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

// ✅ Use multer middleware for image uploads
router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);

export default router;
