// monsterDropSeed.js

/**
 * Siembra los drops de los monsters.
 * Se asume que los items "Health Potion" y "Mana Potion" ya existen en la tabla Item.
 */
import { prisma } from "../src/prismaClient/prismaClient";
export async function monsterDropSeed() {
  // Buscar los monsters sembrados
  const poring = await prisma.monster.findUnique({ where: { name: 'Poring' } });
  const lunatic = await prisma.monster.findUnique({ where: { name: 'Lunatic' } });
  

  if (!poring || !lunatic) {
    console.error('Monsters no encontrados. Siembra primero los monsters.');
    return;
  }

  // Buscar los items que se usarán como drop
  const healthPotion = await prisma.item.findUnique({ where: { name: 'Health Potion' } });
  const manaPotion = await prisma.item.findUnique({ where: { name: 'Mana Potion' } });

  if (!healthPotion || !manaPotion) {
    console.error('Items para drops no encontrados. Asegúrate de sembrar los items primero.');
    return;
  }

  const dropsData = [
    {
      monsterId: poring.id,
      itemId: healthPotion.id,
      rate: 0.5, // 50% de probabilidad de drop
      minQuantity: 1,
      maxQuantity: 2,
      isMvp: false
    },
    {
      monsterId: lunatic.id,
      itemId: manaPotion.id,
      rate: 0.3, // 30% de probabilidad
      minQuantity: 1,
      maxQuantity: 1,
      isMvp: false
    }
  ];

  for (const drop of dropsData) {
    await prisma.monsterDrop.create({
      data: drop,
    });
  }
}
