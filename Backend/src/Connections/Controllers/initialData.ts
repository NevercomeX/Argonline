import { getCharacterById, getInventoryById, getCharacterInventoryItems, getStorageItemById, getEquipmentSlotsByCharacterId  } from "./index";

/**
 * Obtiene todos los datos iniciales para cargar el juego.
 */
export async function getInitialData(characterId: any) {
  try {
    const character = await getCharacterById(characterId);
    const inventory = await getInventoryById(characterId);
    const characterInventory = await getCharacterInventoryItems(characterId);
    const storage = await getStorageItemById(characterId);
    const equipment = await getEquipmentSlotsByCharacterId(characterId);
    return { character, inventory, characterInventory, storage, equipment };
  } catch (error) {
    console.error("Error al obtener los datos iniciales:", error);
    throw new Error("Error al obtener los datos iniciales.");
  }
}

    