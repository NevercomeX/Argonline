import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware.js";
import { prisma } from "../../../../Prisma/prismaClient.js";
import {getUserIdFromToken} from "../../../Controllers/user/usersController.js";

const router = express.Router();

router.get("/", authMiddleware(), (req, res) => {
  // obtener los characters del usuario
  const userId = req.user.id;
  prisma.user
    .findUnique({
      where: { id: parseInt(userId) },
      include: {
        characters: true,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
      return res.json({ success: true, data: user.characters });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ success: false, error: "Server error" });
    });
});

//get user id using token from UserSession table argumento: token

router.post("/getUserIdFromToken", async (req, res) => {
  const { token } = req.body;
  try {
    const userId = await getUserIdFromToken(token);
    return res.status(200).json({ success: true, data: userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
