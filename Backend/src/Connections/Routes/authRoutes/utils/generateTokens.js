import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import {prisma} from '../../../../Prisma/prismaClient.js';
import { v4 as uuid } from 'uuid';

const JWT_EXPIRES = 80 * 5; // 5 minutes
const JWT_REFRESH_EXPIRES = 900 * 60 * 60; // 30 days
const SECRET = process.env.JWT_SECRET; // Secret for JWT

// Verify access token
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
};

// Calculate max age
const calculateMaxAge = (exp) => {
    const now = dayjs().unix();
    const maxAge = now + exp;
    return maxAge;
};

// Generate access token
const generateAccessToken = async ({ payload }) => {

    const token = jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRES });
    const maxAge = JWT_EXPIRES;

    return { token, maxAge };
};

// Generar un refresh token
const generateRefreshToken = async ({ tokenId, userId }) => {
  try {
    // Elimina el token anterior si existe
    if (tokenId) {
      await prisma.userSession.deleteMany({
        where: { id: tokenId },
      });
    }

    // Crea un nuevo token en la base de datos
    const refreshToken = jwt.sign({ userId }, SECRET, { expiresIn: JWT_REFRESH_EXPIRES });

    await prisma.userSession.create({
      data: {
        id: uuid(),
        expiresAt: calculateMaxAge(JWT_REFRESH_EXPIRES),
        userId: userId,
        token: refreshToken, // Guarda el token firmado
      },
    });

    return {
      token: refreshToken, // Devuelve el token firmado
      maxAge: JWT_REFRESH_EXPIRES,
    };
  } catch (err) {
    console.error("Error generating refresh token:", err.message);
    throw new Error("Could not generate refresh token");
  }
};

export {
    verifyToken,
    generateAccessToken,
    generateRefreshToken
};
