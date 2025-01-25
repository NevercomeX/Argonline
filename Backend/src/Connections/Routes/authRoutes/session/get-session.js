import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware.js";
import {prisma} from "../../../../Prisma/prismaClient.js";

const router = express.Router();

// const USER = {
//   id: 1,
//   email: "test@demo.ltd",
//   fistName: "Joaquim",
//   lastName: "Das Couves",
//   bio: "Im a agricultor and i love to plant and take care of my plants.",
//   password: "123456",
// };

router.get("/", authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ success: false, error: "No user ID found in token" });
    }

    const client = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        email: true,
        role: true,
        characters: true,
      },
    });

    if (!client) {
      return res.json({ success: false, error: "User not found" });
    }
    return res.json({
      success: true,
      user: client,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});


export default router;
