import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getInventory() {
  return await prisma.inventory.findMany();
}

export async function getInventoryById(id) {
  /**
   * Retrieves a specific inventory item by its ID.
   *
   * @param {number} id - The ID of the inventory item to retrieve.
   * @returns {Promise<object>} The retrieved inventory item as an object.
   */
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

/**
 * Removes a specified quantity of an item from a character's inventory.
 * @param {number} characterId - The ID of the character whose inventory will be modified.
 * @param {number} itemId - The ID of the item to be removed from the inventory.
 * @param {number} quantity - The quantity of the item to be removed.
 * @returns {Promise<string>} - A promise that resolves with a message indicating the result of the operation or the updated inventory.
 */
export async function removeItemFromInventory(characterId, itemId, quantity) {
  const parsedCharacterId = parseInt(characterId);
  const parsedItemId = parseInt(itemId);

  if (isNaN(parsedCharacterId) || isNaN(parsedItemId)) {
    throw new Error("Invalid characterId or itemId");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be a positive number");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      characterId: parsedCharacterId,
      itemId: parsedItemId,
    },
  });

  if (inventory && inventory.quantity > quantity) {
    await prisma.inventory.update({
      where: { id: inventory.id },
      data: { quantity: inventory.quantity - quantity },
    });
    return `Successfully removed ${quantity} item(s) from the inventory.`;
  } else if (inventory) {
    await prisma.inventory.delete({
      where: { id: inventory.id },
    });
    return `Successfully removed all items from the inventory.`;
  } else {
    throw new Error("Inventory not found");
  }
}
