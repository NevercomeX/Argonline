// src/Controllers/userController.js
import { prisma } from "../../../prismaClient/prismaClient";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "somethingsomething";

/**
 * Obtiene el ID de usuario a partir de un token JWT.
 */
export async function getUserIdFromToken(token: any) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      throw new Error("Token inválido.");
    }
    const userId = (decoded as any).userId;
    return userId;
  } catch (error) {
    throw new Error("Token inválido o expirado.");
  }
}

/**
 * Obtiene todos los usuarios con paginación.
 */
export async function getAllUsers(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const totalUsers = await prisma.user.count();
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  };
}

/**
 * Obtiene un usuario por su ID.
 */
export async function getUserById(id: any) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      characters: true,
      createdAt: true,
    },
  });
}

/**
 * Obtiene todos los personajes de un usuario específico.
 */
export async function getAllCharactersFromUser(id: any) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      characters: true,
    },
  });
}

/**
 * Crea un nuevo personaje para un usuario.
 */
export async function createCharacter(userId: any, characterData: any) {
  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Crear el personaje
    const newCharacter = await prisma.character.create({
      data: {
        ...characterData,
        userId: parseInt(userId),
      },
    });

    return newCharacter;
  } catch (error) {
    console.error("Error creando personaje:", error);
    throw error;
  }
}
