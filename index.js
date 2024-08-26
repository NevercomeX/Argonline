import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";
import { getRandomEnemy } from "./src/Controllers/enemies.js";
import { updateCharacterStatsInRedis } from "./src/Controllers/statsController.js";
import { getCharacterStats } from "./src/Controllers/Character/character.js";

const prisma = new PrismaClient();

async function main() {
  const chracterid = 1;
  try {
    const character = await getCharacterById(chracterid);
    const stats = await getCharacterStats(chracterid);
    const enemy = await getRandomEnemy();
    await updateCharacterStatsInRedis(chracterid,stats);
    

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
