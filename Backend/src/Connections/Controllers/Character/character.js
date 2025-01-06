import { prisma } from "../../../Prisma/prismaClient.js";

export async function getAllCharacters(page = 1, limit = 10) {
  const skip = (page - 1) * limit; // Calcular el salto de registros
  const totalCharacters = await prisma.character.count(); // Contar todos los personajes
  const characters = await prisma.character.findMany({
    skip: skip,
    take: limit, // Limitar la cantidad de registros a tomar
  });

  return {
    characters,
    totalCharacters,
    totalPages: Math.ceil(totalCharacters / limit), // Calcular total de páginas
    currentPage: page,
  };
}

export async function getCharacterById(id) {
  return await prisma.character.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function updateCharacter(id, data) {
  return await prisma.character.update({
    where: { id: parseInt(id) },
    data: data,
  });
}

// Crear un nuevo personaje para el usuario
export async function createCharacter(userId, name, jobClass) {
  try {
    const newCharacter = await prisma.character.create({
      data: {
        name: name,
        jobclassId: parseInt(jobClass), // Asume que tienes un campo "jobclassId" para identificar la clase
        userId: parseInt(userId),
        baseLevel: 1,
        jobLevel: 1,
        health: 100,
        mana: 50,
        attackPower: 10,
        defense: 5,
      },
    });
    return newCharacter;
  } catch (error) {
    throw new Error("Error al crear el personaje");
  }
}
