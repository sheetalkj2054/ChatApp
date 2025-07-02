// backend/lib/utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",  // ✅ this ensures HTTPS cookies only in prod
    sameSite: "None",                                 // ✅ this is needed for frontend-backend on different domains (Render)
    maxAge: 7 * 24 * 60 * 60 * 1000,                  // 7 days
  });

  return token;
};
