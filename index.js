import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";
import { getRandomEnemy } from "./src/Controllers/enemies.js";

const prisma = new PrismaClient();

async function main() {
  try {
    const character = await getCharacterById(1);
    const enemy = await getRandomEnemy();

    if (!character || !enemy) {
      console.error("Character or Enemy not found!");
      return;
    }

    await runGame(character, enemy);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getCharacterById(id) {
  return await prisma.character.findFirst({ where: { id } });
}

main();
