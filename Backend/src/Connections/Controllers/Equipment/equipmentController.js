import { prisma } from "../../../Prisma/prismaClient.js";

/**
 * Obtiene todos los ítems equipados.
 */
export async function getEquipment() {
  return await prisma.equipmentItem.findMany();
}

/**
 * Obtiene un ítem equipado por su ID.
 */
export async function getEquipmentById(id) {
  return await prisma.equipmentItem.findFirst({
    where: { id: parseInt(id) },
  });
}

/**
 * Obtiene todos los ítems equipados por un personaje.
 */
export async function getEquipmentSlotsByCharacterId(characterId) {
  try {
    const equipmentItems = await prisma.equipmentItem.findMany({
      where: { characterId: parseInt(characterId) },
    });
    return equipmentItems;
  } catch (error) {
    console.error("Error al obtener equipamiento:", error);
    throw new Error("Error al obtener equipamiento.");
  }
}

/**
 * Obtiene un ítem específico equipado en un slot de un personaje.
 */
export async function getEquipmentSlotByCharacterIdAndSlot(characterId, slot) {
  try {
    const equipmentItem = await prisma.equipmentItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        slot: slot, // Slot debe ser de tipo EquipmentSlot enum
      },
    });

    return equipmentItem;
  } catch (error) {
    console.error("Error al obtener ítem equipado:", error);
    throw new Error("Error al obtener ítem equipado.");
  }
}

/**
 * Equipa un ítem desde el inventario al personaje en un slot específico.
 */
export async function equipItem(characterId, slot, itemId, itemInstanceId = null) {
  try {
    console.log(`Equipando ítem: ${itemId || itemInstanceId} en slot: ${slot}`);

    if (!slot) {
      throw new Error("El slot no está definido.");
    }

    // Verificar si el personaje ya tiene algo equipado en ese slot
    const currentEquipment = await prisma.equipmentItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        slot: slot,
      },
    });

    if (currentEquipment) {
      console.log(`Desequipando ítem en slot ${slot} antes de equipar uno nuevo.`);
      await unequipItem(characterId, slot);
    }

    // Buscar el ítem en el inventario
    const inventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: itemId ? parseInt(itemId) : undefined,
        itemInstanceId: itemInstanceId ? parseInt(itemInstanceId) : undefined,
      },
    });

    if (!inventoryItem) {
      throw new Error(`Ítem no encontrado en el inventario.`);
    }

    // Equipar el ítem
    await prisma.equipmentItem.create({
      data: {
        characterId: parseInt(characterId),
        itemId: itemId ? parseInt(itemId) : null,
        itemInstanceId: itemInstanceId ? parseInt(itemInstanceId) : null,
        slot: slot,
      },
    });

    // Eliminar o reducir la cantidad del ítem en el inventario
    if (inventoryItem.quantity > 1) {
      await prisma.inventoryItem.update({
        where: { id: inventoryItem.id },
        data: { quantity: { decrement: 1 } },
      });
    } else {
      await prisma.inventoryItem.delete({
        where: { id: inventoryItem.id },
      });
    }

    console.log(`Ítem equipado en el slot ${slot}`);
  } catch (error) {
    console.error(`Error al equipar ítem: ${error.message}`);
    throw new Error("Error al equipar ítem.");
  }
}

/**
 * Desequipa un ítem del slot y lo devuelve al inventario.
 */
export async function unequipItem(characterId, slot) {
  try {
    const equipmentItem = await prisma.equipmentItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        slot: slot,
      },
    });

    if (!equipmentItem) {
      throw new Error(`No se encontró ningún ítem equipado en el slot ${slot}`);
    }

    // Obtener IDs de item o itemInstance
    const { itemId, itemInstanceId } = equipmentItem;

    // Eliminar el ítem del equipo
    await prisma.equipmentItem.delete({
      where: { id: equipmentItem.id },
    });

    // Buscar si ya hay uno igual en el inventario
    const existingInventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: itemId ? parseInt(itemId) : undefined,
        itemInstanceId: itemInstanceId ? parseInt(itemInstanceId) : undefined,
      },
    });

    if (existingInventoryItem) {
      await prisma.inventoryItem.update({
        where: { id: existingInventoryItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      await prisma.inventoryItem.create({
        data: {
          characterId: parseInt(characterId),
          itemId: itemId ? parseInt(itemId) : null,
          itemInstanceId: itemInstanceId ? parseInt(itemInstanceId) : null,
          quantity: 1,
        },
      });
    }

    console.log(`Ítem desequipado y devuelto al inventario.`);
  } catch (error) {
    console.error(`Error al desequipar ítem: ${error.message}`);
    throw new Error("Error al desequipar ítem.");
  }
}
