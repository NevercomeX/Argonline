import { prisma } from "../../Prisma/prismaClient.js";
// Crear una nueva instancia de ítem
export async function createItemInstance(itemData) {
  try {
    const newItemInstance = await prisma.itemInstance.create({
      data: itemData,
    });
    return newItemInstance;
  } catch (error) {
    console.error("Error al crear la instancia de ítem:", error);
    throw error;
  }
}

// Obtener una instancia de ítem por su ID
// items.js
export async function getItemInstanceById(id) {
  if (!id) {
    throw new Error("El ID de la instancia de ítem es indefinido o nulo.");
  }

  try {
    const itemInstance = await prisma.itemInstance.findUnique({
      where: {
        id: id,
      },
      include: {
        itemTemplate: true, // Incluir la plantilla de ítem
      },
    });

    if (!itemInstance) {
      throw new Error(`ItemInstance con ID ${id} no encontrado.`);
    }

    return itemInstance;
  } catch (error) {
    console.error("Error al obtener la instancia de ítem:", error);
    throw error;
  }
}


// Obtener todas las instancias de ítems de un personaje por su ID
export async function getItemInstancesByCharacterId(characterId) {
  try {
    const itemInstances = await prisma.itemInstance.findMany({
      where: { characterId: characterId },
    });
    return itemInstances;
  } catch (error) {
    console.error("Error al obtener las instancias de ítems:", error);
    throw error;
  }
}

// Obtener el nombre de la instancia de ítem por su ID
export async function getItemInstanceNameById(itemInstanceId) {
  try {
    const itemInstance = await prisma.itemInstance.findUnique({
      where: { id: itemInstanceId },
      itemTemplate: {
        item: true, // Incluye el ítem base asociado a la instancia
      },
    });

    if (!itemInstance) {
      throw new Error("Instancia de ítem no encontrada");
    }

    return itemInstance.item.name; // Devuelve el nombre del ítem base
  } catch (error) {
    console.error("Error al obtener el nombre de la instancia de ítem:", error);
    throw error;
  }
}

// Actualizar una instancia de ítem
export async function updateItemInstance(itemInstanceId, updateData) {
  try {
    const updatedItemInstance = await prisma.itemInstance.update({
      where: { id: itemInstanceId },
      data: updateData,
    });
    return updatedItemInstance;
  } catch (error) {
    console.error("Error al actualizar la instancia de ítem:", error);
    throw error;
  }
}

// Eliminar una instancia de ítem
export async function deleteItemInstance(itemInstanceId) {
  try {
    await prisma.itemInstance.delete({
      where: { id: itemInstanceId },
    });
    console.log("Instancia de ítem eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la instancia de ítem:", error);
    throw error;
  }
}
