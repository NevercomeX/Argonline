// src/Controllers/inventoryController.js
import { prisma } from "../../../Prisma/prismaClient.js";

/**
 * Obtiene todos los ítems del inventario de un personaje,
 * incluyendo la información de cada ítem.
 * @param {number|string} characterId 
 * @returns {Promise<Array>}
 */
export async function getInventory(characterId) {
  try {
    const inventory = await prisma.inventoryItem.findMany({
      where: { characterId: parseInt(characterId) },
      include: { item: true },
    });
    return inventory;
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    throw new Error("No se pudo obtener el inventario.");
  }
}

/**
 * Obtiene un ítem del inventario por su ID.
 * @param {number|string} id 
 * @returns {Promise<Object>}
 */
export async function getInventoryById(id) {
  try {
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: parseInt(id) },
      include: { item: true },
    });
    return inventoryItem;
  } catch (error) {
    console.error("Error al obtener el ítem del inventario:", error);
    throw new Error("No se pudo obtener el ítem del inventario.");
  }
}

/**
 * Obtiene todos los ítems de un tipo específico en el inventario.
 * @param {number|string} itemId 
 * @returns {Promise<Array>}
 */
export async function getInventoryByItemId(itemId) {
  try {
    const items = await prisma.inventoryItem.findMany({
      where: { itemId: parseInt(itemId) },
      include: { item: true },
    });
    return items;
  } catch (error) {
    console.error("Error al obtener ítems por itemId:", error);
    throw new Error("No se pudieron obtener los ítems.");
  }
}

/**
 * Obtiene el inventario completo de un personaje, 
 * incluyendo la información de cada ítem.
 * @param {number|string} characterId 
 * @returns {Promise<Object>}
 */
export async function getCharacterInventoryItems(characterId) {
  try {
    const characterInventory = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: {
        inventory: {
          include: { item: true },
        },
      },
    });
    return characterInventory;
  } catch (error) {
    console.error("Error al obtener el inventario del personaje:", error);
    throw new Error("No se pudo obtener el inventario del personaje.");
  }
}

/**
 * Agrega un ítem al inventario del personaje.
 * Si el ítem ya existe, incrementa su cantidad; de lo contrario, lo crea.
 * @param {number|string} characterId 
 * @param {number|string} itemId 
 * @param {number|string} quantity 
 * @returns {Promise<void>}
 */
export async function addItemToInventory(characterId, itemId, quantity) {
  try {
    const parsedQuantity = parseInt(quantity);
    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
      },
    });

    if (existingItem) {
      await prisma.inventoryItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: parsedQuantity } },
      });
    } else {
      await prisma.inventoryItem.create({
        data: {
          characterId: parseInt(characterId),
          itemId: parseInt(itemId),
          quantity: parsedQuantity,
        },
      });
    }
  } catch (error) {
    console.error("Error al agregar ítem al inventario:", error);
    throw new Error("No se pudo agregar el ítem al inventario.");
  }
}

/**
 * Elimina un ítem del inventario del personaje.
 * Si la cantidad a eliminar es igual o mayor que la existente, elimina el registro;
 * de lo contrario, decrementa la cantidad.
 * @param {number|string} characterId 
 * @param {number|string} itemId 
 * @param {number|string} quantity 
 * @returns {Promise<void>}
 */
export async function removeItemFromInventory(characterId, itemId, quantity) {
  try {
    const parsedQuantity = parseInt(quantity);
    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
      },
    });

    if (existingItem) {
      if (existingItem.quantity - parsedQuantity <= 0) {
        await prisma.inventoryItem.delete({
          where: { id: existingItem.id },
        });
      } else {
        await prisma.inventoryItem.update({
          where: { id: existingItem.id },
          data: { quantity: { decrement: parsedQuantity } },
        });
      }
    }
  } catch (error) {
    console.error("Error al eliminar ítem del inventario:", error);
    throw new Error("No se pudo eliminar el ítem del inventario.");
  }
}
