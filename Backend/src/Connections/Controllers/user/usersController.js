// src/Controllers/userController.js
import { prisma } from "../../../Prisma/prismaClient.js";

export async function getUserIdFromToken(token) {

  const userSession = await prisma.userSession.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      userId: true,
    },
  });

  if (!userSession) {
    throw new Error("Token no encontrado o inválido");
  }

  return userSession.userId;
}


// Obtener todos los usuarios
export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
}

// Obtener personajes de un usuario específico
export async function getAllCharactersFromUser(id) {
  return await prisma.user.findMany({
    where: { id: parseInt(id) },
    include: {
      characters: true, // Incluir los personajes asociados al usuario
    },
  });
}

// Crear un nuevo personaje para un usuario
export async function createCharacter(userId, characterData) {
  try {
    const newCharacter = await prisma.character.create({
      data: {
        ...characterData,
        userId: parseInt(userId), // Asociar el personaje al usuario
      },
    });
    return newCharacter;
  } catch (error) {
    console.error("Error creando personaje:", error);
    throw error;
  }
}

