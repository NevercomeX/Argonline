import { prisma } from "../../../prismaClient/prismaClient";

export async function getEnemyDrops() {
  return await prisma.monsterDrop.findMany();
}

export async function getEnemyDropById(id: any) {
  return await prisma.monsterDrop.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

export async function createEnemyDrop(data: any) {
  return await prisma.monsterDrop.create({
    data,
  });
}

export async function updateEnemyDrop(id: any, data: any) {
  return await prisma.monsterDrop.update({
    where: { id: parseInt(id) },
    data,
  });
}

export async function deleteEnemyDrop(id: any) {
  return await prisma.monsterDrop.delete({
    where: { id: parseInt(id) },
  });
}
