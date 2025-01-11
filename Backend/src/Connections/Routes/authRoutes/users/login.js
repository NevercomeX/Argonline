import express from "express";
import { generateRefreshToken, generateAccessToken } from "../utils/generateTokens.js";
import { loginUser } from "../../../Controllers/index.js";
import { prisma } from "../../../../Prisma/prismaClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar credenciales del usuario
    const { user } = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Obtener el tokenId del refresh token anterior (si existe)
    const existingSession = await prisma.userSession.findFirst({
      where: { userId: user.id },
      orderBy: { expiresAt: "desc" }, // Obtener el token más reciente
    });

    const tokenId = existingSession?.id;

    // Crear payload para el access token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generar tokens
    const refreshToken = await generateRefreshToken({ tokenId, userId: user.id });
    const accessToken = await generateAccessToken({ payload });

    // Preparar cookies para el cliente
    const cookies = {
      accessCookie: {
        value: accessToken.token,
        maxAge: accessToken.maxAge,
      },
      refreshCookie: {
        value: refreshToken.token,
        maxAge: refreshToken.maxAge,
      },
    };

    // Enviar respuesta
    return res.status(200).json({
      success: true,
      cookies,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
