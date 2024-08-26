// statsController.js
import redisClient from '../cache/rediscClient.js';
import { prisma } from '../Prisma/prismaClient.js';

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
      const item = character.inventory.find((inv) => inv.itemId === slot.itemId)?.item;
      if (item && item.equipable) {
        itemStats = item;
      }
    }

    // Si el slot tiene un ítem instanciado
    if (slot.itemInstanceId) {
      const itemInstance = character.inventory.find((inv) => inv.itemInstanceId === slot.itemInstanceId)?.itemInstance;
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
      console.log(`Sumando item: ${itemStats.name} - Attack Power: ${itemStats.attackPower}, Defense: ${itemStats.defense}`);
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
  await redisClient.set(`character:stats:${characterId}`, JSON.stringify(totalStats), {
    EX: 600, // 600 segundos = 10 minutos
  });

  return totalStats;
}

export async function getCharacterStats(characterId) {
  // Intenta obtener las estadísticas desde Redis
  const cachedStats = await redisClient.hGetAll(`character:stats:${characterId}`);
  if (cachedStats && Object.keys(cachedStats).length > 0) {
    // Convierte los valores de Redis a números, si es necesario
    return {
      totalAttackPower: parseInt(cachedStats.totalAttackPower),
      totalDefense: parseInt(cachedStats.totalDefense),
      totalHealth: parseInt(cachedStats.totalHealth),
      totalMana: parseInt(cachedStats.totalMana),
      // ...otros atributos
    };
  }

  // Si no está en caché, calcula las estadísticas y guárdalas en Redis
  const stats = await calculateTotalStats(characterId);
  await redisClient.hSet(`character:stats:${characterId}`, {
    str: stats.str,
    agi: stats.agi,
    int: stats.int,
    vit: stats.vit,
    dex: stats.dex,
    luk: stats.luk,
    baseLevel: stats.baseLevel,
    jobLevel: stats.jobLevel,
    baseExp: stats.baseExp,
    jobExp: stats.jobExp,
    maxBaseExp: stats.maxBaseExp,
    maxJobExp: stats.maxJobExp,
    skillPoints: stats.skillPoints,
    health: stats.totalHealth,
    maxHealth: stats.totalHealth,
    maxMana: stats.totalMana,
    mana: stats.totalMana,
    attackPower: stats.totalAttackPower,
    magicPower: stats.magicPower,
    defense: stats.totalDefense,
    magicDefense: stats.magicDefense,
  });

  return stats;
}

export async function updateCharacterStatsInRedis(characterId, stats) {
  // Actualiza las estadísticas del personaje en Redis
  await redisClient.hSet(`character:stats:${characterId}`, {
    str: stats.str,
    agi: stats.agi,
    int: stats.int,
    vit: stats.vit,
    dex: stats.dex,
    luk: stats.luk,
    baseLevel: stats.baseLevel,
    jobLevel: stats.jobLevel,
    baseExp: stats.baseExp,
    jobExp: stats.jobExp,
    maxBaseExp: stats.maxBaseExp,
    maxJobExp: stats.maxJobExp,
    skillPoints: stats.skillPoints,
    health: stats.totalHealth,
    maxHealth: stats.totalHealth,
    maxMana: stats.totalMana,
    mana: stats.totalMana,
    attackPower: stats.totalAttackPower,
    magicPower: stats.magicPower,
    defense: stats.totalDefense,
    magicDefense: stats.magicDefense,
  });
}

// Función para sincronizar Redis con la base de datos
export async function syncStatsToDatabase(characterId) {
  const stats = await getCharacterStats(characterId);

  // Actualizar la base de datos con los stats desde Redis
  await prisma.character.update({
    where: { id: characterId },
    data: {
      str: stats.str,
      agi: stats.agi,
      int: stats.int,
      vit: stats.vit,
      dex: stats.dex,
      luk: stats.luk,
      baseLevel: stats.baseLevel,
      jobLevel: stats.jobLevel,
      baseExp: stats.baseExp,
      jobExp: stats.jobExp,
      maxBaseExp: stats.maxBaseExp,
      maxJobExp: stats.maxJobExp,
      skillPoints: stats.skillPoints,
      health: stats.totalHealth,
      maxHealth: stats.totalHealth,
      maxMana: stats.totalMana,
      mana: stats.totalMana,
      attackPower: stats.totalAttackPower,
      magicPower: stats.magicPower,
      defense: stats.totalDefense,
      magicDefense: stats.magicDefense,
    },
  });
}
