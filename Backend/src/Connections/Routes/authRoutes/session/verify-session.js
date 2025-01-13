// verify-session.js
import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), async (req, res) => {
  const { id, email } = req.user;
  res.json({ success: true, user: { id, email } });
});

export default router;
