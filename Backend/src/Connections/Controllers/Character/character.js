import { prisma } from "../../../Prisma/prismaClient.js";

export async function getAllCharacters(page = 1, limit = 3) {
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

//get all characters of user id with pagination

export async function getCharactersByUserId(userId, page = 1, limit = 3) {
  // Validar userId
  if (!userId || isNaN(parseInt(userId))) {
    throw new Error("Invalid user ID");
  }

  // Validar que la página sea válida
  page = Math.max(1, parseInt(page)); // Asegurarse de que la página sea al menos 1
  const skip = (page - 1) * limit;

  // Contar personajes filtrados por el usuario
  const totalCharacters = await prisma.character.count({
    where: { userId: parseInt(userId) },
  });

  // Obtener los personajes paginados
  const characters = await prisma.character.findMany({
    where: { userId: parseInt(userId) },
    skip: skip,
    take: limit,
  });

  // Retornar los datos con una estructura consistente
  return {
    characters: characters || [], // Asegurarse de que siempre se devuelva un array
    totalCharacters,
    totalPages: Math.ceil(totalCharacters / limit), // Calcular total de páginas
    currentPage: page,
  };
}


// export async function getCharactersByUserId(userId) {
//   return await prisma.character.findMany({
//     where: { userId: parseInt(userId) },
//   });
// }

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
export async function createCharacter(userId, name, jobClass, gender) {
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
        gender: gender
      },
    });
    return newCharacter;
  } catch (error) {
    throw new Error("Error al crear el personaje");
  }
}

export async function createCharacterWithAttributes(userId, name, jobClass, attributes, gender) {
  try {
    // Validar atributos
    if (!attributes || typeof attributes !== "object") {
      throw new Error("Invalid attributes provided.");
    }

    const { str, agi, vit, int, dex, luk } = attributes;

    // Calcular estadísticas iniciales basadas en los atributos
    const baseHealth = 100 + vit * 10; // Cada punto de VIT añade 10 HP
    const baseMana = 50 + int * 5; // Cada punto de INT añade 5 MP
    const attackPower = str * 2 + dex; // STR multiplica más el ataque físico, DEX contribuye menos
    const magicPower = int * 2; // INT influye en el poder mágico
    const defense = vit + agi; // VIT contribuye al aguante físico y AGI a la evasión
    const magicDefense = int + luk; // INT para resistencia mágica y LUK para suerte general

    // Crear el nuevo personaje en la base de datos
    const newCharacter = await prisma.character.create({
      data: {
        name: name,
        jobclassId: parseInt(jobClass), // ID de la clase del personaje
        userId: parseInt(userId),
        baseLevel: 1,
        jobLevel: 1,
        baseExp: 0,
        jobExp: 0,
        maxBaseExp: 100,
        maxJobExp: 100,
        health: baseHealth,
        maxHealth: baseHealth,
        mana: baseMana,
        maxMana: baseMana,
        attackPower: attackPower,
        magicPower: magicPower,
        defense: defense,
        magicDefense: magicDefense,
        str: str,
        agi: agi,
        vit: vit,
        int: int,
        dex: dex,
        luk: luk,
        skillPoints: 0, // Inicialmente el jugador no tiene puntos de habilidad
        gender: gender
      },
    });

    return newCharacter;
  } catch (error) {
    console.error("Error al crear el personaje:", error.message);
    throw new Error("Error al crear el personaje. Por favor, inténtalo de nuevo.");
  }
}
