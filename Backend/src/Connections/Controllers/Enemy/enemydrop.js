import { prisma } from "../../../Prisma/prismaClient.js";

export async function getEnemyDrops() {
  return await prisma.enemyDrop.findMany();
}

export async function getEnemyDropById(id) {
  return await prisma.enemyDrop.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

export async function createEnemyDrop(data) {
  return await prisma.enemyDrop.create({
    data,
  });
}

export async function updateEnemyDrop(id, data) {
  return await prisma.enemyDrop.update({
    where: { id: parseInt(id) },
    data,
  });
}

export async function deleteEnemyDrop(id) {
  return await prisma.enemyDrop.delete({
    where: { id: parseInt(id) },
  });
}
