import { prisma, JobName } from "../../../prismaClient/prismaClient";

const JOB_ID_TO_ENUM: Record<string, JobName> = {
  "1": JobName.NOVICE,
  "2": JobName.SWORDSMAN,
  "3": JobName.ARCHER,
  "4": JobName.MAGE,
  "5": JobName.MERCHANT,
  "6": JobName.THIEF,
  "7": JobName.ACOLYTE,
  "8": JobName.SUPER_NOVICE,
  "9": JobName.HUNTER,
  "10": JobName.CHICKEN,
  "11": JobName.NINJA,
  "12": JobName.ALCHEMIST,
  "13": JobName.ASSASSIN,
  "14": JobName.BARD,
  "15": JobName.BLACKSMITH,
  "16": JobName.CRUSADER,
  "17": JobName.DANCER,
  "18": JobName.GUNSLINGER,
  "19": JobName.KNIGHT,
  "20": JobName.MONK,
  "21": JobName.PRIEST,
  "22": JobName.ROGUE,
  "23": JobName.SAGE,
  "24": JobName.WIZARD,
};

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
export async function getCharactersByUserId(userId : string, page : number = 1, limit : number = 3) {
  if (!userId || isNaN(parseInt(userId))) {
    throw new Error("Invalid user ID");
  }

  page = Math.max(1, parseInt(page as any));
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
export async function getCharacterById(id : string) {
  return await prisma.character.findUnique({
    where: { id: parseInt(id) },
  });
}

/**
 * Actualiza un personaje por ID.
 */
export async function updateCharacter(id: any, data: any) {
  return await prisma.character.update({
    where: { id: parseInt(id) },
    data,
  });
}

/**
 * Crea un nuevo personaje para un usuario.
 */
export async function createCharacter(userId: any, name: any, jobClass: any) {
  // Convert jobClass ID to Enum if necessary
  const validJobClass = JOB_ID_TO_ENUM[(jobClass)] || (jobClass as JobName);

  if (!Object.values(JobName).includes(validJobClass)) {
    throw new Error(`Invalid job class: ${jobClass}`);
  }

  try {
    const newCharacter = await prisma.character.create({
      data: {
        name,
        jobclass: validJobClass, // ✅ Ahora es un enum
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
    console.error("Error al crear el personaje:", error);
    throw new Error("Error al crear el personaje.");
  }
}

/**
 * Crea un personaje con atributos personalizados.
 */
export async function createCharacterWithAttributes(userId: any, name: any, jobClass: any, attributes: any) {
  try {
    if (!attributes || typeof attributes !== "object") {
      throw new Error("Invalid attributes provided.");
    }

    const { str, agi, vit, int, dex, luk } = attributes;

    const validJobClass = JOB_ID_TO_ENUM[String(jobClass)] || (jobClass as JobName);

    if (!Object.values(JobName).includes(validJobClass)) {
      throw new Error(`Invalid job class: ${jobClass}`);
    }

    // Cálculo de estadísticas iniciales
    const baseHealth = 100 + vit * 10;
    const baseMana = 50 + int * 5;

    const newCharacter = await prisma.character.create({
      data: {
        name,
        jobclass: validJobClass, // ✅ Enum, no jobclassId
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
    console.error("Error al crear el personaje:", error);
    throw new Error("Error al crear el personaje.");
  }
}
