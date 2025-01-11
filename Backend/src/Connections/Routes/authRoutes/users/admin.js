import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(), (req, res) => {
  res.send("This route is protected");
});

export default router;
