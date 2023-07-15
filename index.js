import { PrismaClient } from "@prisma/client";
import Player from "./src/Entities/Player.js";
import { startGame } from "./src/Game.js";

const prisma = new PrismaClient();

console.clear();
console.log("Bienvenido a Ragnarok!");

export async function getPlayer(prisma) {
  const playerData = await prisma.player.findUnique({
    where: { id: 1 },
  });
  const player = new Player(playerData);
  return player;
}

export async function getEnemies(prisma) {
  return await prisma.enemy.findMany();
}

async function main() {
  const prisma = new PrismaClient();
  const player = await getPlayer(prisma);
  const enemies = await getEnemies(prisma);
  startGame(player, enemies);
  return;
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
