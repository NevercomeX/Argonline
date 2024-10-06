// src/Controllers/userController.js
import { prisma } from '../../Prisma/prismaClient.js';

// Obtener todos los usuarios
export async function getAllUsers() {
  return await prisma.user.findMany();
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

// Registrar un nuevo usuario
export async function registerUser(userData) {
  const { username, password, email } = userData;
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
        email:  email, // Deberías cifrar la contraseña en un proyecto real
      },
    });
    return newUser;
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
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
    console.error('Error creando personaje:', error);
    throw error;
  }
}
