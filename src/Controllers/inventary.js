import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getInventory() {
  return await prisma.inventory.findMany();
}

export async function getInventoryById(id) {
  return await prisma.inventory.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getInventoryByItemId(id) {
  const inventory = await prisma.inventory.findMany({
    where: { itemId: parseInt(id) },
  });
  return inventory;
}

export async function getInventoryByEnemyId(id) {
  const inventory = await prisma.inventory.findMany({
    where: { enemyId: parseInt(id) },
  });
  return inventory;
}

//get a list of all items from a specific character inventory

export async function getCharacterInventory(id) {
  const playerInventory = await prisma.character.findUnique({
    where: { id: id },
    include: {
      inventory: true,
    },
  });

  return playerInventory;
}

export async function getCharacterInventoryItems(id) {
  const playerInventory = await prisma.character.findUnique({
    where: { id: id },
    include: {
      inventory: {
        include: {
          item: true,
        },
      },
    },
  });
  return playerInventory;
}

export async function addItemToInventory(characterId, itemId, quantity) {
  const inventory = await prisma.inventory.create({
    data: {
      characterId: parseInt(characterId),
      itemId: parseInt(itemId),
      quantity: parseInt(quantity),
    },
  });

  return inventory;
}

export async function removeItemFromInventory(characterId, itemId, quantity) {
  const inventory = await prisma.inventory.findFirst({
    where: {
      characterId: parseInt(characterId),
      itemId: parseInt(itemId),
    },
  });

  if (inventory.quantity > quantity) {
    await prisma.inventory.update({
      where: { id: inventory.id },
      data: { quantity: inventory.quantity - quantity },
    });
  } else {
    await prisma.inventory.delete({
      where: { id: inventory.id },
    });
  }
}
