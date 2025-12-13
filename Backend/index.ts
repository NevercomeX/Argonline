
// import { runGame } from "./src/Game";


// import { runGame } from "@/Engine/Game";
import { getRandomEnemy, getCharacterById } from "@/Connections/Controllers/index";
import { prisma } from "@/prismaClient/prismaClient";


async function main(characterId: any ) {
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
    // await runGame(character.id, enemy.id);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(1);
