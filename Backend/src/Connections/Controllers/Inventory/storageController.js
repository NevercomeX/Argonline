// src/Controllers/storageController.js
import { prisma } from "../../../Prisma/prismaClient.js";

/**
 * Obtiene todos los ítems del almacenamiento de un usuario,
 * incluyendo la información del ítem.
 * @param {number|string} userId 
 * @returns {Promise<Array>}
 */
export async function getStorageItems(userId) {
  try {
    const storageItems = await prisma.storageItem.findMany({
      where: { userId: parseInt(userId) },
      include: { item: true },
    });
    return storageItems;
  } catch (error) {
    console.error("Error al obtener el almacenamiento:", error);
    throw new Error("No se pudo obtener el almacenamiento.");
  }
}

/**
 * Obtiene un ítem del almacenamiento por su ID.
 * @param {number|string} id 
 * @returns {Promise<Object>}
 */
export async function getStorageItemById(id) {
  try {
    const storageItem = await prisma.storageItem.findUnique({
      where: { id: parseInt(id) },
      include: { item: true },
    });
    return storageItem;
  } catch (error) {
    console.error("Error al obtener el ítem del almacenamiento:", error);
    throw new Error("No se pudo obtener el ítem del almacenamiento.");
  }
}

/**
 * Agrega un ítem al almacenamiento del usuario.
 * Si ya existe un registro con el mismo itemId y refineLevel, incrementa la cantidad.
 * @param {number|string} userId 
 * @param {number|string} itemId 
 * @param {number|string} quantity 
 * @param {number} [refineLevel=0] 
 * @param {any} [cards=null] - Opcional, si el ítem requiere información de cartas.
 * @returns {Promise<void>}
 */
export async function addItemToStorage(userId, itemId, quantity, refineLevel = 0, cards = null) {
  try {
    const parsedQuantity = parseInt(quantity);
    const existingItem = await prisma.storageItem.findFirst({
      where: {
        userId: parseInt(userId),
        itemId: parseInt(itemId),
        refineLevel: refineLevel, // La combinación (userId, itemId, refineLevel) es única
      },
    });

    if (existingItem) {
      await prisma.storageItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: parsedQuantity } },
      });
    } else {
      await prisma.storageItem.create({
        data: {
          userId: parseInt(userId),
          itemId: parseInt(itemId),
          quantity: parsedQuantity,
          refineLevel,
          cards, // Puede ser null o un objeto JSON, según la lógica de tu aplicación
        },
      });
    }
  } catch (error) {
    console.error("Error al agregar ítem al almacenamiento:", error);
    throw new Error("No se pudo agregar el ítem al almacenamiento.");
  }
}

/**
 * Elimina un ítem del almacenamiento del usuario.
 * Si la cantidad a eliminar es igual o mayor que la existente, elimina el registro;
 * de lo contrario, decrementa la cantidad.
 * @param {number|string} userId 
 * @param {number|string} itemId 
 * @param {number|string} quantity 
 * @param {number} [refineLevel=0]
 * @returns {Promise<void>}
 */
export async function removeItemFromStorage(userId, itemId, quantity, refineLevel = 0) {
  try {
    const parsedQuantity = parseInt(quantity);
    const existingItem = await prisma.storageItem.findFirst({
      where: {
        userId: parseInt(userId),
        itemId: parseInt(itemId),
        refineLevel: refineLevel,
      },
    });

    if (existingItem) {
      if (existingItem.quantity - parsedQuantity <= 0) {
        await prisma.storageItem.delete({
          where: { id: existingItem.id },
        });
      } else {
        await prisma.storageItem.update({
          where: { id: existingItem.id },
          data: { quantity: { decrement: parsedQuantity } },
        });
      }
    }
  } catch (error) {
    console.error("Error al eliminar ítem del almacenamiento:", error);
    throw new Error("No se pudo eliminar el ítem del almacenamiento.");
  }
}
