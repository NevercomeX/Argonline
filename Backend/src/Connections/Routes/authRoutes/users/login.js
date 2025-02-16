// src/Routes/auth/login.js
import express from "express";
import { generateRefreshToken, generateAccessToken } from "../utils/generateTokens.js";
import { loginUser } from "../../../Controllers/index.js";
import { prisma } from "../../../../Prisma/prismaClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  }

  try {
    // Validar credenciales del usuario
    const { user } = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Buscar el refresh token previo, si existe, para eliminarlo
    const existingSession = await prisma.userSession.findFirst({
      where: { userId: user.id },
      orderBy: { expiresAt: "desc" },
    });
    const tokenId = existingSession?.id;

    // Crear payload para el access token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generar los tokens
    const refreshToken = await generateRefreshToken({ tokenId, userId: user.id });
    const accessToken = await generateAccessToken({ payload });

    // Preparar cookies (o bien el objeto de respuesta) con los tokens
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

    return res.status(200).json({
      success: true,
      cookies,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Error en el servidor. Intenta de nuevo más tarde." });
  }
});

export default router;
