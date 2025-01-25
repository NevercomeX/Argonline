import express from "express";
import { prisma } from "../../../../Prisma/prismaClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  
    const refreshToken = authHeader.split(" ")[1];

    try {
      // Elimina la sesión basada en el refreshToken
      const deletedSession = await prisma.userSession.deleteMany({
        where: { token: refreshToken.token
         }, // Asegúrate de que `token` en la base de datos almacene el refreshToken
      });

      if (deletedSession.count === 0) {
        return res.status(404).json({ success: false, message: "Session not found" });
      }
  
      return res.status(200).json({ success: true, message: "Session destroyed" });
    } catch (error) {
      console.error("Logout error:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

export default router;
