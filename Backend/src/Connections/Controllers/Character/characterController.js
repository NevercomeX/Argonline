import { prisma } from "../../../Prisma/prismaClient.js";

/**
 * Obtiene todos los personajes con paginación.
 */
export async function getAllCharacters(page = 1, limit = 3) {
  const skip = (page - 1) * limit;
  const totalCharacters = await prisma.character.count();
  const characters = await prisma.character.findMany({
    skip,
    take: limit,
  });

  return {
    characters,
    totalCharacters,
    totalPages: Math.ceil(totalCharacters / limit),
    currentPage: page,
  };
}

/**
 * Obtiene todos los personajes de un usuario con paginación.
 */
export async function getCharactersByUserId(userId, page = 1, limit = 3) {
  if (!userId || isNaN(parseInt(userId))) {
    throw new Error("Invalid user ID");
  }

  page = Math.max(1, parseInt(page));
  const skip = (page - 1) * limit;

  const totalCharacters = await prisma.character.count({
    where: { userId: parseInt(userId) },
  });

  const characters = await prisma.character.findMany({
    where: { userId: parseInt(userId) },
    skip,
    take: limit,
  });

  return {
    characters: characters || [],
    totalCharacters,
    totalPages: Math.ceil(totalCharacters / limit),
    currentPage: page,
  };
}

/**
 * Obtiene un personaje por su ID.
 */
export async function getCharacterById(id) {
  return await prisma.character.findUnique({
    where: { id: parseInt(id) },
  });
}

/**
 * Actualiza un personaje por ID.
 */
export async function updateCharacter(id, data) {
  return await prisma.character.update({
    where: { id: parseInt(id) },
    data,
  });
}

/**
 * Crea un nuevo personaje para un usuario.
 */
export async function createCharacter(userId, name, jobClass) {
  try {
    const newCharacter = await prisma.character.create({
      data: {
        name,
        jobclass: jobClass, // ✅ Ahora es un enum
        userId: parseInt(userId),
        baseLevel: 1,
        jobLevel: 1,
        health: 100,
        maxHealth: 100,
        mana: 50,
        maxMana: 50,
        attackSpeed: 150,
        attackRange: 1,
        zeny: 0,
        statusPoints: 0,
        skillPoints: 0,
      },
    });
    return newCharacter;
  } catch (error) {
    console.error("Error al crear el personaje:", error.message);
    throw new Error("Error al crear el personaje.");
  }
}

/**
 * Crea un personaje con atributos personalizados.
 */
export async function createCharacterWithAttributes(userId, name, jobClass, attributes) {
  try {
    if (!attributes || typeof attributes !== "object") {
      throw new Error("Invalid attributes provided.");
    }

    const { str, agi, vit, int, dex, luk } = attributes;

    // Cálculo de estadísticas iniciales
    const baseHealth = 100 + vit * 10;
    const baseMana = 50 + int * 5;

    const newCharacter = await prisma.character.create({
      data: {
        name,
        jobclass: jobClass, // ✅ Enum, no jobclassId
        userId: parseInt(userId),
        baseLevel: 1,
        jobLevel: 1,
        baseExp: 0,
        jobExp: 0,
        health: baseHealth,
        maxHealth: baseHealth,
        mana: baseMana,
        maxMana: baseMana,
        attackSpeed: 150,
        attackRange: 1,
        zeny: 0,
        statusPoints: 0,
        skillPoints: 0,
        str,
        agi,
        vit,
        int,
        dex,
        luk,
      },
    });

    return newCharacter;
  } catch (error) {
    console.error("Error al crear el personaje:", error.message);
    throw new Error("Error al crear el personaje.");
  }
}
