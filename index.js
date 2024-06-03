import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";

const prisma = new PrismaClient();



async function main() {
  //get character id and pass it to runGame

  const character = await prisma.character.findFirst({
    where: {
      id: 1,
    },
  });

  const enemy = await prisma.enemy.findFirst({
    where: {
      id: 1,
    },
  });

  await runGame(character, enemy);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
