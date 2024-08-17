import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEquipment() {
  return await prisma.equipment.findMany();
}

export async function getEquipmentById(id) {
  return await prisma.equipment.findFirst({
    where: { id: parseInt(id) },
  });
}

export async function getEquipmentByCharacterIdAndSlot(characterId, slot) {
  const equipment = await prisma.equipment.findFirst({
    where: {
      characterId: parseInt(characterId),
      [slot]: { not: null },
    },
  });
  return equipment;
}

export async function getEquipmentByCharacterId(characterId) {
  const equipment = await prisma.equipment.findMany({
    where: { characterId: parseInt(characterId) },
  });
  return equipment;
}

export async function unequipItem(characterId, slot) {
  try {
    // Encuentra el registro de equipo para el personaje y verifica que el slot no esté vacío
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

    // Actualiza el equipo del personaje para vaciar el slot
    await prisma.equipment.update({
      where: { id: equipment.id },
      data: { [slot]: null },
    });

    // Verifica si el ítem ya está en el inventario
    const inventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: parseInt(characterId),
        itemId: parseInt(itemId),
        location: 'inventory',
      },
    });

    if (inventoryItem) {
      // Si el ítem ya existe en el inventario, actualiza la cantidad
      await prisma.inventory.update({
        where: { id: inventoryItem.id },
        data: { quantity: { increment: 1 } }, // Aumenta la cantidad en el inventario
      });
    } else {
      // Si el ítem no existe en el inventario, lo crea
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




export async function deleteEquipmentById(id) {
  const equipment = await prisma.equipment.findFirst({
    where: { id: parseInt(id) },
  });
  if (equipment) {
    await prisma.equipment.delete({
      where: { id: parseInt(id) },
    });
  } else {
    throw new Error("Equipment not found");
  }
}
