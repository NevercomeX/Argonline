import { prisma } from "../Prisma/prismaClient.js";

export async function getEquipment() {
  return await prisma.equipment.findMany();
}

export async function getEquipmentById(id) {
  return await prisma.equipment.findFirst({
    where: { id: parseInt(id) },
  });
}

export async function getEquipmentByCharacterIdAndSlot(characterId, slot) {
  if (!slot) {
    throw new Error("El slot proporcionado no es válido");
  }
  const equipment = await prisma.equipment.findFirst({
    where: {
      characterId: parseInt(characterId),
      [slot]: { not: null },
    },
  });

  return equipment;
}

export async function getEquipmentByCharacterId(characterId) {
  try {
    const equipment = await prisma.equipment.findMany({
      where: { characterId: characterId },
    });
    return equipment;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw new Error("Failed to fetch equipment");
  }
}

export async function unequipItem(characterId, slot) {
  try {
    // Encuentra el equipo del personaje en el slot específico
    const equipment = await prisma.equipment.findFirst({
      where: {
        characterId: parseInt(characterId),
        [slot]: { not: null },
      },
    });

    if (!equipment || equipment[slot] === null) {
      console.log(`No se encontró ningún ítem en el slot ${slot}`);
      return;
    }

    const itemId = equipment[slot];

    // Vacía el slot en la tabla equipment
    await prisma.equipment.update({
      where: { id: equipment.id },
      data: { [slot]: null },
    });

    // Busca el ítem en el inventario, sin importar el location
    const existingInventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
      },
    });

    if (existingInventoryItem) {
      // Si el ítem ya existe en el inventario, actualiza el location
      await prisma.inventory.update({
        where: { id: existingInventoryItem.id },
        data: { location: 'inventory' }, // Actualiza el location a 'inventory'
      });
    } else {
      // Si el ítem no existe en el inventario, crea un nuevo registro
      await prisma.inventory.create({
        data: {
          characterId: parseInt(characterId),
          itemId: parseInt(itemId),
          quantity: 1,
          location: 'inventory',
        },
      });
    }

    console.log(`Ítem ${itemId} ha sido desequipado y devuelto al inventario.`);
  } catch (error) {
    console.error(`Error al desequipar ítem: ${error.message}`);
  }
}

export async function equipItem(characterId, slot, itemId) {
  try {
    // Encuentra el ítem en el inventario
    const inventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
        location: 'inventory', // Asegúrate de que el ítem está en el inventario
      },
    });

    if (inventoryItem) {
      // Actualiza la ubicación del ítem para indicar que está equipado
      await prisma.inventory.update({
        where: { id: inventoryItem.id },
        data: { location: slot }, // Actualiza `location` al slot donde se equipa
      });

      // Encuentra el registro de equipment para el characterId
      const equipment = await prisma.equipment.findFirst({
        where: { characterId: parseInt(characterId) },
      });

      if (equipment) {
        // Actualiza la tabla equipment para reflejar el ítem equipado
        await prisma.equipment.update({
          where: { id: equipment.id }, // Usa el id único para actualizar
          data: { [slot]: parseInt(itemId) }, // Actualiza el slot correspondiente con el id del ítem
        });

        console.log(`Ítem ${itemId} equipado en el slot ${slot}`);
      } else {
        console.error(`No se encontró equipo para el personaje con id ${characterId}`);
      }
    } else {
      console.error(`Ítem ${itemId} no encontrado en el inventario`);
    }
  } catch (error) {
    console.error(`Error al equipar ítem: ${error.message}`);
  }
}