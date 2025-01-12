// src/Controllers/userController.js
import { prisma } from "../../../Prisma/prismaClient.js";

// model UserSession {
//   id         String     @id @default(uuid())
//   userId     Int
//   token      String
//   expiresAt  Int
//   user       User    @relation(fields: [userId], references: [id])
// }

//get user id from token on UserSession table
//token most converted to string

export async function getUserIdFromToken(token) {
  console.log("token", token);
  const userSession = await prisma.userSession.findUnique({
    where: {
      id: token,
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczNjY1MDc4OSwiZXhwIjoxNzM5ODkwNzg5fQ.aV8UNXSFhOin6SGz3UVaINqweWwYLbp2Uy6mVmDEWkI = DATABASE
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkZXZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzY2NTA3ODksImV4cCI6MTczNjY1MTE4OX0.ZAYSpGX1axUENtwzGFaOtesbNX0XSMthnAZy1yW7erE

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

