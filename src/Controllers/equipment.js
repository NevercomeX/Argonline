import { prisma } from "../Prisma/prismaClient.js";

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

export async function getEquipmentSlotByCharacterIdAndSlot(characterId, slotType) {
  try {
    const equipmentSlot = await prisma.equipmentSlot.findFirst({
      where: {
        characterId: parseInt(characterId),
        slotType: slotType,
      },
    });

    return equipmentSlot;
  } catch (error) {
    console.error("Error fetching equipment slot:", error);
    throw new Error("Failed to fetch equipment slot");
  }
}

export async function unequipItem(characterId, slotType) {
  try {
    // Buscar el registro de EquipmentSlot para el personaje específico
    const equipmentSlot = await prisma.equipmentSlot.findFirst({
      where: {
        characterId: parseInt(characterId),
      },
    });

    if (!equipmentSlot) {
      console.log(`No se encontró ningún equipo para el personaje con ID ${characterId}`);
      return;
    }

    // Obtener el itemId del slot específico (por ejemplo, upperHeadSlot, rightHandSlot, etc.)
    const itemId = equipmentSlot[slotType];

    if (!itemId) {
      console.log(`Slot ${slotType} está vacío.`);
      return;
    }

    // Desequipar el ítem y moverlo al inventario
    await prisma.equipmentSlot.update({
      where: { id: equipmentSlot.id },
      data: { [slotType]: null },  // Establecer el slot específico a null
    });

    // Verificar si ya existe el ítem en el inventario del personaje
    const existingInventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
      },
    });

    if (existingInventoryItem) {
      // Si el ítem ya está en el inventario, incrementar la cantidad
      await prisma.inventory.update({
        where: { id: existingInventoryItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      // Si no está en el inventario, crearlo con cantidad 1
      await prisma.inventory.create({
        data: {
          characterId: parseInt(characterId),
          itemId: parseInt(itemId),
          quantity: 1,
        },
      });
    }

    console.log(`Ítem ${itemId} ha sido desequipado y devuelto al inventario.`);
  } catch (error) {
    console.error(`Error al desequipar ítem: ${error.message}`);
  }
}

export async function equipItem(characterId, slotType, itemId) {
  try {
    const inventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
      },
    });

    if (!inventoryItem || inventoryItem.quantity === 0) {
      console.error(`Ítem ${itemId} no encontrado en el inventario`);
      return;
    }

    // Asegurarse de que slotType coincida con los campos correctos del modelo
    const equipmentData = {};
    equipmentData[slotType] = parseInt(itemId);

    await prisma.equipmentSlot.update({
      where: { characterId: parseInt(characterId) },
      data: equipmentData,
    });

    await prisma.inventory.update({
      where: { id: inventoryItem.id },
      data: { quantity: inventoryItem.quantity - 1 },
    });

    console.log(`Ítem ${itemId} equipado en el slot ${slotType}`);
  } catch (error) {
    console.error(`Error al equipar ítem: ${error.message}`);
  }
}