import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEnemies() {
  return await prisma.enemy.findMany();
}

export async function getEnemyById(id) {
  return await prisma.enemy.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

export async function getRandomEnemy() {
  const enemies = await getEnemies();
  const randomIndex = Math.floor(Math.random() * enemies.length);
  return enemies[randomIndex];
}
