// src/utils/generateTokens.js
import jwt from "jsonwebtoken";
import { prisma } from "../../../../Prisma/prismaClient.js";
import { v4 as uuid } from "uuid";

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("Falta la variable de entorno JWT_SECRET.");
}

const JWT_ACCESS_EXPIRES = "500m";   // 500 minutos test purposes
const JWT_REFRESH_EXPIRES = "30d"; // 30 días

/**
 * Verifica el access token.
 * @param {string} token 
 * @returns {object|boolean}
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return false;
  }
};

/**
 * Genera un access token y retorna el token junto a su maxAge en milisegundos.
 * @param {object} param0 { payload }
 * @returns {Promise<{token: string, maxAge: number}>}
 */
export const generateAccessToken = async ({ payload }) => {
  try {
    const token = jwt.sign(payload, SECRET, { expiresIn: JWT_ACCESS_EXPIRES });
    const decoded = jwt.decode(token);
    // decoded.exp está en segundos, se pasa a milisegundos y se calcula el tiempo restante
    const maxAge = decoded.exp * 1000 - Date.now();
    return { token, maxAge };
  } catch (error) {
    console.error("Error generating access token:", error.message);
    throw new Error("Could not generate access token");
  }
};

/**
 * Genera un refresh token, lo almacena en la base de datos y retorna el token junto a su maxAge.
 * @param {object} param0 { tokenId, userId }
 * @returns {Promise<{token: string, maxAge: number}>}
 */
export const generateRefreshToken = async ({ tokenId, userId }) => {
  try {
    // Elimina el token anterior, si existe
    if (tokenId) {
      await prisma.userSession.deleteMany({
        where: { id: tokenId },
      });
    }
    const refreshToken = jwt.sign({ userId }, SECRET, { expiresIn: JWT_REFRESH_EXPIRES });
    const decoded = jwt.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000); // Convertir a Date

    // Almacenar el refresh token en la DB
    await prisma.userSession.create({
      data: {
        id: uuid(), // Se genera un ID único para la sesión
        userId,
        token: refreshToken,
        expiresAt,
      },
    });

    const maxAge = decoded.exp * 1000 - Date.now();
    return { token: refreshToken, maxAge };
  } catch (err) {
    console.error("Error generating refresh token:", err.message);
    throw new Error("Could not generate refresh token");
  }
};
