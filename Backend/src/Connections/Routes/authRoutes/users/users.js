import express from "express";
import { authProtect } from "../utils/auth.js";
import { prisma } from "../../../../Prisma/prismaClient.js";

const router = express.Router();

router.get("/", authProtect(), (req, res) => {
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

export default router;
