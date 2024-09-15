// statsController.js
import redisClient from "../../cache/rediscClient.js";
import { prisma } from "../../Prisma/prismaClient.js";
import { getCharacterById } from "../Character/character.js";

export async function calculateTotalStats(characterId) {
  // Intenta obtener las estadísticas desde Redis
  const cachedStats = await redisClient.get(`character:stats:${characterId}`);
  if (cachedStats) {
    return JSON.parse(cachedStats);
  }

  // Si no está en caché, calcula las estadísticas
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      equipmentSlot: true,
      inventory: {
        include: {
          item: true,
          itemInstance: {
            include: {
              itemTemplate: true, // Incluir la plantilla de ítem para obtener el campo equipable
            },
          },
        },
      },
    },
  });

  // Inicializar stats totales con los valores base del personaje
  let totalAttackPower = character.attackPower;
  let totalDefense = character.defense;
  let totalHealth = character.health;
  let totalMana = character.mana;

  console.log(`Base Attack Power: ${totalAttackPower}`);
  console.log(`Base Defense: ${totalDefense}`);

  // Sumar los stats de los ítems equipados
  for (const slot of character.equipmentSlot) {
    let itemStats = null;

    // Si el slot tiene un ítem normal
    if (slot.itemId) {
      const item = character.inventory.find(
        (inv) => inv.itemId === slot.itemId,
      )?.item;
      if (item && item.equipable) {
        itemStats = item;
      }
    }

    // Si el slot tiene un ítem instanciado
    if (slot.itemInstanceId) {
      const itemInstance = character.inventory.find(
        (inv) => inv.itemInstanceId === slot.itemInstanceId,
      )?.itemInstance;
      if (itemInstance && itemInstance.itemTemplate.equipable) {
        itemStats = itemInstance; // Usar directamente itemInstance para sumar sus estadísticas
      }
    }

    if (itemStats) {
      // Sumar todos los atributos relevantes del ítem equipado

      totalAttackPower += itemStats.attackPower || 0;
      totalDefense += itemStats.defense || 0;
      totalHealth += itemStats.health || 0;
      totalMana += itemStats.mana || 0;

      // Agregar otros stats si es necesario (STR, AGI, etc.)
      console.log(
        `Sumando item: ${itemStats.name} - Attack Power: ${itemStats.attackPower}, Defense: ${itemStats.defense}`,
      );
    }
  }

  const totalStats = {
    totalAttackPower,
    totalDefense,
    totalHealth,
    totalMana,
    // ... incluir otros stats
  };

  // Almacena las estadísticas en Redis con una expiración de 10 minutos
  await redisClient.set(
    `character:stats:${characterId}`,
    JSON.stringify(totalStats),
    {
      EX: 600, // 600 segundos = 10 minutos
    },
  );

  return totalStats;
}

export async function getCharacterStatsFromRedis(characterId) {
  // Intenta obtener las estadísticas desde Redis
  const cachedStats = await redisClient.hGetAll(
    `character:stats:${characterId}`,
  );

  if (cachedStats && Object.keys(cachedStats).length > 0) {
    // Convierte los valores de Redis a números, si es necesario
    return {
      id: parseInt(cachedStats.id),
      str: parseInt(cachedStats.str, 10),
      agi: parseInt(cachedStats.agi, 10),
      int: parseInt(cachedStats.int, 10),
      vit: parseInt(cachedStats.vit, 10),
      dex: parseInt(cachedStats.dex, 10),
      luk: parseInt(cachedStats.luk, 10),
      baseLevel: parseInt(cachedStats.baseLevel, 10),
      jobLevel: parseInt(cachedStats.jobLevel, 10),
      baseExp: parseInt(cachedStats.baseExp, 10),
      jobExp: parseInt(cachedStats.jobExp, 10),
      maxBaseExp: parseInt(cachedStats.maxBaseExp, 10),
      maxJobExp: parseInt(cachedStats.maxJobExp, 10),
      skillPoints: parseInt(cachedStats.skillPoints, 10),
      health: parseInt(cachedStats.health, 10),
      maxHealth: parseInt(cachedStats.maxHealth, 10),
      maxMana: parseInt(cachedStats.maxMana, 10),
      mana: parseInt(cachedStats.mana, 10),
      attackPower: parseInt(cachedStats.attackPower, 10),
      defense: parseInt(cachedStats.defense, 10),
      health: parseInt(cachedStats.health, 10),
      mana: parseInt(cachedStats.mana, 10),
      // ...otros atributos
    };
  }

  // Si no está en caché, recupera las estadísticas de la base de datos
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      equipmentSlot: true,
      inventory: {
        include: {
          item: true,
          itemInstance: true,
        },
      },
    },
  });

  if (!character) {
    throw new Error(`Character with id ${characterId} not found`);
  }

  // Extraer y calcular los atributos necesarios
  const stats = {
    id: character.id,
    name: character.name,
    str: character.str,
    agi: character.agi,
    int: character.int,
    vit: character.vit,
    dex: character.dex,
    luk: character.luk,
    jobclassId: character.jobclassId,
    baseLevel: character.baseLevel,
    jobLevel: character.jobLevel,
    baseExp: character.baseExp,
    jobExp: character.jobExp,
    maxBaseExp: character.maxBaseExp,
    maxJobExp: character.maxJobExp,
    skillPoints: character.skillPoints,
    maxHealth: character.maxHealth,
    maxMana: character.maxMana,
    attackPower: character.attackPower,
    defense: character.defense,
    magicPower: character.magicPower,
    magicDefense: character.magicDefense,
    health: character.health,
    mana: character.mana,
    // Puedes sumar aquí las estadísticas adicionales de los ítems equipados, como lo hiciste antes.
  };

  // Convertir todos los valores a cadenas antes de almacenarlos en Redis
  const statsAsString = Object.fromEntries(
    Object.entries(stats).map(([key, value]) => [key, value.toString()]),
  );

  // Guardar los stats en Redis
  console.log("Estadísticas guardadas en Redis");
  await redisClient.hSet(`character:stats:${characterId}`, statsAsString);

  return stats;
}

export async function updateCharacterStatsInRedis(characterId, stats) {
  // Verificar si la clave existe y eliminarla si es de un tipo incorrecto
  const key = `character:stats:${characterId}`;

  try {
    // Borra la clave existente si existe para evitar conflictos de tipo
    await redisClient.del(key);

    // Convertir el objeto stats en un array de pares clave-valor con valores por defecto
    const statsArray = [
      "id",
      characterId.toString(),
      "str",
      (stats.str ?? 0).toString(),
      "agi",
      (stats.agi ?? 0).toString(),
      "int",
      (stats.int ?? 0).toString(),
      "vit",
      (stats.vit ?? 0).toString(),
      "dex",
      (stats.dex ?? 0).toString(),
      "luk",
      (stats.luk ?? 0).toString(),
      "baseLevel",
      (stats.baseLevel ?? 0).toString(),
      "jobLevel",
      (stats.jobLevel ?? 0).toString(),
      "baseExp",
      (stats.baseExp ?? 0).toString(),
      "jobExp",
      (stats.jobExp ?? 0).toString(),
      "maxBaseExp",
      (stats.maxBaseExp ?? 0).toString(),
      "maxJobExp",
      (stats.maxJobExp ?? 0).toString(),
      "skillPoints",
      (stats.skillPoints ?? 0).toString(),
      "health",
      (stats.totalHealth ?? 0).toString(),
      "maxHealth",
      (stats.totalHealth ?? 0).toString(),
      "maxMana",
      (stats.totalMana ?? 0).toString(),
      "mana",
      (stats.totalMana ?? 0).toString(),
      "attackPower",
      (stats.totalAttackPower ?? 0).toString(),
      "magicPower",
      (stats.magicPower ?? 0).toString(),
      "defense",
      (stats.totalDefense ?? 0).toString(),
      "magicDefense",
      (stats.magicDefense ?? 0).toString(),
    ];

    // Actualiza las estadísticas del personaje en Redis como un hash
    await redisClient.hSet(key, statsArray);
    console.log("Estadísticas actualizadas en Redis");
  } catch (error) {
    console.error(
      `Error al actualizar las estadísticas en Redis: ${error.message}`,
    );
  }
}

// Función para sincronizar Redis con la base de datos
export async function syncStatsToDatabase(characterId) {
  const stats = await getCharacterById(characterId);
  console.log(stats);

  // Actualizar la base de datos con los stats desde Redis
  try {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        id: stats.id,
        str: stats.str,
        agi: stats.agi,
        int: stats.int,
        vit: stats.vit,
        dex: stats.dex,
        luk: stats.luk,
        jobclassId: stats.jobclassId,
        baseLevel: stats.baseLevel,
        jobLevel: stats.jobLevel,
        baseExp: stats.baseExp,
        jobExp: stats.jobExp,
        maxBaseExp: stats.maxBaseExp,
        maxJobExp: stats.maxJobExp,
        skillPoints: stats.skillPoints,
        health: stats.health,
        maxHealth: stats.maxHealth,
        maxMana: stats.maxMana,
        mana: stats.mana,
        attackPower: stats.attackPower,
        magicPower: stats.magicPower,
        defense: stats.defense,
        magicDefense: stats.magicDefense,
      },
    });
    console.log("Estadísticas sincronizadas con la base de datos");
  } catch (error) {
    console.error(
      `Error al sincronizar las estadísticas con la base de datos: ${error.message}`,
    );
  }
}
