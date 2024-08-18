import { prisma } from "../Prisma/prismaClient.js";

export async function getInventory(characterId) {
  try {
    const inventory = await prisma.inventory.findMany({
      where: {
        characterId: characterId,
      },
    });
    return inventory;
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    throw error;
  }
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
  const existingItem = await prisma.inventory.findFirst({
    where: {
      characterId: parseInt(characterId),
      itemId: parseInt(itemId),
    },
  });

  if (existingItem) {
    await prisma.inventory.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + parseInt(quantity),
      },
    });
  } else {
    // Crear una instancia de ítem antes de agregarlo al inventario
    const newItemInstance = await prisma.itemInstance.create({
      data: {
        itemTemplateId: parseInt(itemId),
        characterId: parseInt(characterId),
        // Otros campos de la instancia, según el modelo
      },
    });

    await prisma.inventory.create({
      data: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
        itemInstanceId: newItemInstance.id, // Asigna la instancia creada
        quantity: parseInt(quantity),
      },
    });
  }
}


export async function removeItemFromInventory(characterId, itemId, quantity) {
  const existingItem = await prisma.inventory.findFirst({
    where: {
      characterId: parseInt(characterId),
      itemId: parseInt(itemId),
    },
  });

  if (existingItem) {
    if (existingItem.quantity - parseInt(quantity) <= 0) {
      await prisma.inventory.delete({
        where: { id: existingItem.id },
      });
    } else {
      await prisma.inventory.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity - parseInt(quantity),
        },
      });
    }
  }
}
