import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";
import {
  getRandomEnemy,
  updateCharacterStatsInRedis,
  getCharacterStatsFromRedis,
  getCharacterById,
} from "./src/Controllers/index.js";

const prisma = new PrismaClient();
async function main(characterId) {
  try {
    // Intenta obtener los stats del personaje desde Redis
    let stats = await getCharacterStatsFromRedis(characterId);

    if (!stats) {
      // Si no existen en Redis, obtiene el personaje de la base de datos

      const character = await getCharacterById(characterId);

      if (!character) {
        console.error("Character not found!");
        return;
      }
      // Actualiza las stats del personaje en Redis
      await updateCharacterStatsInRedis(characterId, character);

      // Obtén los stats nuevamente ahora que están en Redis
      stats = await getCharacterStatsFromRedis(characterId);
    }

    // Obtiene un enemigo aleatorio
    const enemy = await getRandomEnemy();

    if (!enemy) {
      console.error("Enemy not found!");
      return;
    }

    // Ejecuta el juego
    await runGame(stats.id, enemy);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(1);
