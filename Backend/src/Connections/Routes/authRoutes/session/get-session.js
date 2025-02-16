// src/Routes/user/getUserInfo.js
import express from "express";
import authMiddleware from "../../../Middleware/authMiddleware.js";
import { prisma } from "../../../../Prisma/prismaClient.js";

const router = express.Router();

// Función replacer para convertir BigInt a string
const bigintReplacer = (key, value) => {
  return typeof value === "bigint" ? value.toString() : value;
};

router.get("/", authMiddleware(), async (req, res) => {
  try {
    // Verificar que el middleware haya agregado req.user
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "No se encontró el ID del usuario en el token." });
    }

    const userId = parseInt(req.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        characters: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }

    // Convertir el objeto para serializar BigInt
    const safeUser = JSON.parse(JSON.stringify(user, bigintReplacer));

    return res.status(200).json({ success: true, user: safeUser });
  } catch (err) {
    console.error("Error obteniendo la información del usuario:", err);
    return res.status(500).json({ success: false, error: "Error del servidor." });
  }
});

export default router;
