import { prisma } from "../../../Prisma/prismaClient.js";
import redisClient from "../../../redisClient.js";

/**
 * Calcula y actualiza las estadísticas de combate de un personaje.
 *
 * @param {number|string} characterId - ID del personaje
 * @returns {Promise<Object>} - Objeto con las estadísticas finales
 */
export async function calculateCombatStats(characterId) {
  if (!characterId) {
    throw new Error("Character ID is required.");
  }

  const charId = Number(characterId);
  const cacheKey = `combatStats:${charId}`;

  // Eliminar caché previo
  await redisClient.del(cacheKey);

  // Obtener los atributos base del personaje
  const character = await prisma.character.findUnique({
    where: { id: charId },
    select: {
      str: true,
      agi: true,
      vit: true,
      int: true,
      dex: true,
      luk: true,
    },
  });

  if (!character) {
    throw new Error("Character not found.");
  }

  // Obtener los ítems equipados
  const equipmentItems = await prisma.equipmentItem.findMany({
    where: { characterId: charId },
    include: {
      item: true,
    },
  });

  let totalStr = character.str;
  let totalAgi = character.agi;
  let totalVit = character.vit;
  let totalInt = character.int;
  let totalDex = character.dex;
  let totalLuk = character.luk;

  // Sumar modificadores de los ítems equipados
  equipmentItems.forEach((eq) => {
    if (eq.item) {
      totalStr += eq.item.attack || 0;
      totalAgi += eq.item.magicAttack || 0;
      totalVit += eq.item.defense || 0;
      totalInt += eq.item.magicDefense || 0;
    }
  });

  const combatStats = {
    totalStr,
    totalAgi,
    totalVit,
    totalInt,
    totalDex,
    totalLuk,
  };

  // Guardar en caché con expiración de 60 segundos
  await redisClient.set(cacheKey, JSON.stringify(combatStats), { EX: 60 });

  return combatStats;
}

/**
 * Maneja la solicitud WebSocket para calcular estadísticas de combate.
 *
 * @param {WebSocket} ws - Conexión WebSocket
 * @param {Object} message - Mensaje recibido en formato JSON
 */
export async function handleCombatStatsRequest(ws, message) {
  try {
    const { characterId } = message.payload;

    if (!characterId) {
      return ws.send(JSON.stringify({ error: "Character ID is required" }));
    }

    const stats = await calculateCombatStats(characterId);

    ws.send(JSON.stringify({
      type: "combatStats",
      characterId,
      stats,
    }));

  } catch (error) {
    console.error("Error calculating combat stats:", error);
    ws.send(JSON.stringify({ error: error.message }));
  }
}
