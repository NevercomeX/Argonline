import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware(), (req: any, res: any) => {
  res.send("This route is protected");
});

export default router;
