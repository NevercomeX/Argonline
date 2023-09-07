import { PrismaClient } from "@prisma/client";
import { runGame } from "./src/Game.js";

const prisma = new PrismaClient();

console.clear();
console.log("Bienvenido a Ragnarok!");

async function main() {
  //get character id and pass it to runGame

  // const character = await prisma.character.findFirst({
  //   where: {
  //     id: 1,
  //   },
  // });

  await runGame(1);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
