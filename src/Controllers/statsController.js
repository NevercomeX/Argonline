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
  

// Inicializar stats totales



let totalAttackPower = character.attackPower;
let totalDefense = character.defense;

console.log(totalAttackPower)
console.log(totalDefense)
  // ... otros stats

  for (const slot of character.equipmentSlot) {
    let itemStats = null;

  if (slot.itemId) {
    const item = character.inventory.find((inv) => inv.itemId === slot.itemId)?.item;
    if (item && item.equipable) {
      itemStats = item;
    }
  }

  if (slot.itemInstanceId) {
    const itemInstance = character.inventory.find((inv) => inv.itemInstanceId === slot.itemInstanceId)?.itemInstance;
    if (itemInstance && itemInstance.itemTemplate.equipable) {
      itemStats = itemInstance.itemTemplate; // Las instancias heredan stats de itemTemplate
    }
  }

    if (itemStats) {
    totalAttackPower += itemStats.attackPower || 0;
    totalDefense += itemStats.defense || 0;
    // ... sumar otros stats
  }
  const totalStats = { totalAttackPower, totalDefense /*... otros stats*/ };

  // Almacena las estadísticas en Redis con una expiración de 10 minutos
  await redisClient.set(`character:stats:${characterId}`, JSON.stringify(totalStats), {
    EX: 600, // 600 segundos = 10 minutos
  });

  return totalStats;
}
}
