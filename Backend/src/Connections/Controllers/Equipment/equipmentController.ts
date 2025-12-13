import { prisma } from "../../../prismaClient/prismaClient";

/**
 * Obtiene todos los ítems equipados, incluyendo información del ítem y su instancia.
 */
export async function getEquipment() {
  try {
    const equipment = await prisma.equipmentItem.findMany({
      include: {
        item: true,
        itemInstance: true,
      },
    });
    return equipment;
  } catch (error) {
    console.error("Error al obtener el equipamiento:", error);
    throw new Error("Error al obtener el equipamiento.");
  }
}

/**
 * Obtiene un ítem equipado por su ID, incluyendo información relacionada.
 * @param {number|string} id 
 */
export async function getEquipmentById(id: any) {
  try {
    const equipment = await prisma.equipmentItem.findFirst({
      where: { id: Number(id) },
      include: {
        item: true,
        itemInstance: true,
      },
    });
    return equipment;
  } catch (error) {
    console.error("Error al obtener equipamiento por ID:", error);
    throw new Error("Error al obtener equipamiento por ID.");
  }
}

/**
 * Obtiene todos los ítems equipados para un personaje.
 * @param {number|string} characterId 
 */
export async function getEquipmentSlotsByCharacterId(characterId: any) {
  try {
    const equipmentItems = await prisma.equipmentItem.findMany({
      where: { characterId: Number(characterId) },
      include: {
        item: true,
        itemInstance: true,
      },
    });
    return equipmentItems;
  } catch (error) {
    console.error("Error al obtener equipamiento del personaje:", error);
    throw new Error("Error al obtener equipamiento.");
  }
}

/**
 * Obtiene el ítem equipado en un slot específico para un personaje.
 * @param {number|string} characterId 
 * @param {string} slot - Valor del enum EquipmentSlot (ej. "WEAPON", "ARMOR", etc.)
 */
export async function getEquipmentSlotByCharacterIdAndSlot(characterId: any, slot: any) {
  try {
    const equipmentItem = await prisma.equipmentItem.findFirst({
      where: {
        characterId: Number(characterId),
        slot: slot,
      },
      include: {
        item: true,
        itemInstance: true,
      },
    });
    return equipmentItem;
  } catch (error) {
    console.error("Error al obtener ítem equipado en el slot:", error);
    throw new Error("Error al obtener ítem equipado.");
  }
}

/**
 * Equipa un ítem desde el inventario al personaje en un slot específico.
 * Realiza las siguientes operaciones:
 *  - Si ya existe equipado algo en ese slot, lo desequipa.
 *  - Busca el ítem en el inventario (normal o instanciable).
 *  - Valida que el ítem se pueda equipar en el slot indicado (comparando con su propiedad 'equipSlots').
 *  - Crea un registro en equipment.
 *  - Reduce o elimina la cantidad del ítem en el inventario.
 * 
 * @param {number|string} characterId 
 * @param {string} slot - Valor del enum EquipmentSlot (ej. "WEAPON", "ARMOR", etc.)
 * @param {number|string} itemId 
 * @param {number|string|null} itemInstanceId 
 */
export async function equipItem(characterId: any, slot: any, itemId: any, itemInstanceId: any = null) {
  try {
    console.log(`Equipando ítem: ${itemId || itemInstanceId} en slot: ${slot}`);
    
    if (!slot) {
      throw new Error("El slot no está definido.");
    }

    // Si ya hay algo equipado en ese slot, se desequipa primero.
    const currentEquipment = await prisma.equipmentItem.findFirst({
      where: {
        characterId: Number(characterId),
        slot: slot,
      },
    });
    if (currentEquipment) {
      console.log(`Desequipando ítem en slot ${slot} antes de equipar uno nuevo.`);
      await unequipItem(characterId, slot);
    }

    // Buscar el ítem en el inventario del personaje, incluyendo la información para validar equipSlots.
    const inventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: Number(characterId),
        itemId: itemId ? Number(itemId) : undefined,
        itemInstanceId: itemInstanceId ? Number(itemInstanceId) : undefined,
      },
      include: {
        item: true,
      },
    });

    if (!inventoryItem) {
      throw new Error("Ítem no encontrado en el inventario.");
    }

    // Validar que el ítem se pueda equipar en el slot indicado.
    if (inventoryItem.item && Array.isArray(inventoryItem.item.equipSlots)) {
      if (!inventoryItem.item.equipSlots.includes(slot)) {
        throw new Error("El ítem no puede equiparse en ese slot.");
      }
    } else {
      console.warn("El ítem no tiene definidos equipSlots; se permite equipar en cualquier slot.");
    }

    // Crear el registro en equipment para equipar el ítem.
    await prisma.equipmentItem.create({
      data: {
        characterId: Number(characterId),
        itemId: itemId ? Number(itemId) : null,
        itemInstanceId: itemInstanceId ? Number(itemInstanceId) : null,
        slot: slot,
      },
    });

    // Reducir la cantidad o eliminar el registro del inventario.
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
    console.error(`Error al equipar ítem: ${error}`);
    throw new Error("Error al equipar ítem.");
  }
}

/**
 * Desequipa un ítem del slot indicado y lo devuelve al inventario.
 * Realiza las siguientes operaciones:
 *  - Busca el ítem equipado en el slot.
 *  - Elimina el registro de equipment.
 *  - Si ya existe el mismo ítem en el inventario, incrementa su cantidad; de lo contrario, crea un nuevo registro.
 * 
 * @param {number|string} characterId 
 * @param {string} slot 
 */
export async function unequipItem(characterId: any, slot: any) {
  try {
    const equipmentItem = await prisma.equipmentItem.findFirst({
      where: {
        characterId: Number(characterId),
        slot: slot,
      },
    });
    if (!equipmentItem) {
      console.warn(`No se encontró ningún ítem equipado en el slot ${slot}`);
      // Retornamos sin error si no se encontró nada, ya que esto es aceptable en el flujo de equipamiento.
      return;
    }

    const { itemId, itemInstanceId } = equipmentItem;

    // Eliminar el registro del equipo.
    await prisma.equipmentItem.delete({
      where: { id: equipmentItem.id },
    });

    // Buscar si ya existe el ítem en el inventario.
    const existingInventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        characterId: Number(characterId),
        itemId: itemId ? Number(itemId) : undefined,
        itemInstanceId: itemInstanceId ? Number(itemInstanceId) : undefined,
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
          characterId: Number(characterId),
          itemId: itemId ? Number(itemId) : null,
          itemInstanceId: itemInstanceId ? Number(itemInstanceId) : null,
          quantity: 1,
        },
      });
    }

    console.log("Ítem desequipado y devuelto al inventario.");
  } catch (error) {
    console.error(`Error al desequipar ítem: ${error}`);
    throw new Error("Error al desequipar ítem.");
  }
}


/**
 * Obtiene el menú de equipamiento de un personaje.
 * Retorna un objeto con cada slot del enum EquipmentSlot mapeado al ítem equipado (o null si no hay ninguno).
 * @param {number|string} characterId 
 */
export async function getEquipmentMenu(characterId: any) {
  try {
    // Definimos los slots según el enum de EquipmentSlot
    const slots = [
      "HEAD_TOP",
      "HEAD_MID",
      "HEAD_LOW",
      "ARMOR",
      "WEAPON",
      "SHIELD",
      "GARMENT",
      "SHOES",
      "ACCESSORY1",
      "ACCESSORY2",
      "AMMO",
    ];

    // Obtenemos todos los registros de equipment para el personaje
    const equipmentItems = await prisma.equipmentItem.findMany({
      where: { characterId: Number(characterId) },
      include: { item: true, itemInstance: true },
    });

    // Construimos el menú mapeando cada slot al ítem encontrado o null
    const menu: Record<string, any> = {};
    slots.forEach((slot) => {
      menu[slot] = equipmentItems.find((e) => e.slot === slot) || null; 
    });

    return menu;
  } catch (error) {
    console.error("Error al obtener el menú de equipamiento:", error);
    throw new Error("Error al obtener el menú de equipamiento.");
  }
}
