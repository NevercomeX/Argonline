import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";
import { getRandomEnemy, getCharacterById } from "./src/Controllers/index.js";

const prisma = new PrismaClient();

async function main(characterId) {
  try {
    // Obtén el personaje directamente de la base de datos
    const character = await getCharacterById(characterId);

    if (!character) {
      console.error("Character not found!");
      return;
    }

    // Obtiene un enemigo aleatorio
    const enemy = await getRandomEnemy();

    if (!enemy) {
      console.error("Enemy not found!");
      return;
    }

    // Ejecuta el juego con los stats del personaje directamente de la base de datos
    await runGame(character.id, enemy);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(1);
