// monsterSpawnSeed.js

/**
 * Siembra los puntos de aparición (spawns) para los monsters.
 * Se asume que existe un mapa con nombre "prontera".
 */
import { prisma } from "../src/prismaClient/prismaClient";
export async function monsterSpawnSeed() {
  // Buscar el mapa "prontera"
  const map = await prisma.map.findUnique({
    where: { name: 'Prontera' }
  });

  if (!map) {
    console.error('Mapa "prontera" no encontrado. Por favor, siembra primero los mapas.');
    return;
  }

  // Buscar los monsters que se sembraron previamente
  const poring = await prisma.monster.findUnique({ where: { name: 'Poring' } });
  const lunatic = await prisma.monster.findUnique({ where: { name: 'Lunatic' } });

  if (!poring || !lunatic) {
    console.error('Monsters no encontrados. Asegúrate de sembrar los monsters primero.');
    return;
  }

  const spawnsData = [
    {
      monsterId: poring.id,
      mapId: map.id,
      x: 100,
      y: 200,
      amount: 5,
      respawnTime: 30
    },
    {
      monsterId: lunatic.id,
      mapId: map.id,
      x: 150,
      y: 250,
      amount: 2,
      respawnTime: 60
    }
  ];

  for (const spawn of spawnsData) {
    await prisma.monsterSpawn.create({
      data: spawn,
    });
  }
}
