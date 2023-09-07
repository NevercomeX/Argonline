import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCharacter() {
  const playerData = await prisma.character.findUnique({
    where: { id: 1 },
  });

  return playerData;
}

export async function getEnemies() {
  return await prisma.enemy.findMany();
}

export async function getItems() {
  return await prisma.item.findMany();
}

export async function getJobClasses() {
  return await prisma.jobClass.findMany();
}

//get character equipment by id

export async function getEquipment(characterId) {
  return await prisma.equipment.findFirst({
    where: { characterId },
  });
}
export async function getInventory() {
  return await prisma.inventory.findMany();
}

export async function getEnemyDrops() {
  return await prisma.enemyDrop.findMany();
}

async function getUsers() {
  return await prisma.user.findMany();
}
