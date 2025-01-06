import { prisma } from "../../../Prisma/prismaClient.js";

export async function getEquipment() {
  return await prisma.equipmentSlot.findMany();
}

export async function getEquipmentById(id) {
  return await prisma.equipmentSlot.findFirst({
    where: { id: parseInt(id) },
  });
}

export async function getEquipmentSlotsByCharacterId(characterId) {
  try {
    const equipmentSlots = await prisma.equipmentSlot.findMany({
      where: { characterId: parseInt(characterId) },
    });
    return equipmentSlots;
  } catch (error) {
    console.error("Error fetching equipment slots:", error);
    throw new Error("Failed to fetch equipment slots");
  }
}

export async function getEquipmentSlotByCharacterIdAndSlot(
  characterId,
  slotType,
) {
  try {
    const equipmentSlot = await prisma.equipmentSlot.findFirst({
      where: {
        characterId: parseInt(characterId),
        [slotType]: { not: null },
      },
    });

    return equipmentSlot;
  } catch (error) {
    console.error("Error fetching equipment slot:", error);
    throw new Error("Failed to fetch equipment slot");
  }
}

// Función para desequipar un ítem de un slot y devolverlo al inventario
export async function unequipItem(characterId, slotType) {
  console.log("controller",characterId,slotType)
  try {
    // Buscar el slot de equipamiento específico
    const equipmentSlot = await prisma.equipmentSlot.findFirst({
      where: {
        characterId: parseInt(characterId),
        [slotType]: { not: null },
      },
    });

    if (!equipmentSlot) {
      console.log(`No se encontró ningún ítem en el slot ${slotType}`);
      return;
    }

    const itemIdOrInstanceId = equipmentSlot[slotType];

    // Actualizar el campo del slot a null para "desequipar" el ítem
    await prisma.equipmentSlot.update({
      where: { id: equipmentSlot.id },
      data: { [slotType]: null },
    });

    // Verificar si el ítem es un item normal o una instancia
    const isInstance = await prisma.itemInstance.findUnique({
      where: { id: itemIdOrInstanceId },
    });

    if (isInstance) {
      // Es una instancia de ítem
      const existingInventoryItem = await prisma.inventory.findFirst({
        where: {
          characterId: parseInt(characterId),
          itemInstanceId: itemIdOrInstanceId,
        },
      });

      if (existingInventoryItem) {
        await prisma.inventory.update({
          where: { id: existingInventoryItem.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await prisma.inventory.create({
          data: {
            characterId: parseInt(characterId),
            itemInstanceId: itemIdOrInstanceId,
            quantity: 1,
          },
        });
      }
    } else {
      // Es un ítem normal
      const existingInventoryItem = await prisma.inventory.findFirst({
        where: {
          characterId: parseInt(characterId),
          itemId: itemIdOrInstanceId,
        },
      });

      if (existingInventoryItem) {
        await prisma.inventory.update({
          where: { id: existingInventoryItem.id },
          data: { quantity: { increment: 1 } },
        });
      } else {
        await prisma.inventory.create({
          data: {
            characterId: parseInt(characterId),
            itemId: itemIdOrInstanceId,
            quantity: 1,
          },
        });
      }
    }
    console.log(
      `Ítem ${itemIdOrInstanceId} ha sido desequipado y devuelto al inventario.`,
    );
  } catch (error) {
    console.error(`Error al desequipar ítem: ${error.message}`);
  }
}

// backend/controllers/equipmentController.js

// backend/controllers/equipmentController.js

export async function equipItem(characterId, slotType, itemId, isInstance) {
  try {
    console.log(`Equipando ítem: ${itemId}, Slot: ${slotType}, Es instancia: ${isInstance}`);

    if (!slotType) {
      throw new Error("slotType no está definido");  // <-- Verifica si el slotType está presente
    }

    // Buscar el ítem en el inventario del personaje
    let inventoryItem;
    if (isInstance) {
      inventoryItem = await prisma.inventory.findFirst({
        where: {
          characterId: characterId,
          itemInstanceId: itemId,
        },
      });
    } else {
      inventoryItem = await prisma.inventory.findFirst({
        where: {
          characterId: characterId,
          itemId: itemId,
        },
      });
    }

    if (!inventoryItem || inventoryItem.quantity <= 0) {
      console.error(`Ítem ${itemId} no encontrado o cantidad insuficiente en el inventario`);
      return;
    }

    // Buscar el registro de EquipmentSlot correspondiente al personaje
    const equipmentSlotRecord = await prisma.equipmentSlot.findFirst({
      where: { characterId: characterId },
    });

    if (!equipmentSlotRecord) {
      console.error(`No se encontró registro de EquipmentSlot para characterId ${characterId}`);
      return;
    }

    console.log(`Registro de EquipmentSlot encontrado: ${equipmentSlotRecord.id}`);

    // Verificar si hay un ítem equipado en el slot y desequiparlo
    const currentItemId = equipmentSlotRecord[slotType];
    if (currentItemId) {
      console.log(`Desequipando ítem del slot: ${slotType}`);
      await unequipItem(characterId, slotType);
    }

    // Asegurarse de que slotType coincida con los campos correctos del modelo
    const equipmentData = {};
    equipmentData[slotType] = itemId;

    console.log(`Actualizando EquipmentSlot con ${equipmentData[slotType]} en ${slotType}`);

    // Actualizar el slot correspondiente con el ítem
    await prisma.equipmentSlot.update({
      where: { id: equipmentSlotRecord.id },
      data: equipmentData,
    });

    // Reducir la cantidad del ítem en el inventario o eliminar si la cantidad es 0
    if (inventoryItem.quantity - 1 <= 0) {
      await prisma.inventory.delete({
        where: { id: inventoryItem.id },
      });
    } else {
      await prisma.inventory.update({
        where: { id: inventoryItem.id },
        data: { quantity: inventoryItem.quantity - 1 },
      });
    }

    console.log(`Ítem ${itemId} equipado en el slot ${slotType}`);
  } catch (error) {
    console.error(`Error al equipar ítem: ${error.message}`);
  }
}


