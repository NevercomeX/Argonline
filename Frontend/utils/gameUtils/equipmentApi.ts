//utils/gameUtils/equipmentApi.ts

import { revalidateTag } from "next/cache";

/**
 * Obtiene el menú de equipamiento de un personaje.
 * Se asume que el endpoint devuelve un array (o un objeto) y se toma el primer elemento,
 * que es el objeto que mapea cada slot con el ítem equipado.
 */
export const getEquipmentSlotsByCharacterId = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/equipment/character/${characterId}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching equipment slots: ${response.statusText}`);
    }
    const equipmentSlots = await response.json();
    // Revalidamos la caché del equipo para este character
    revalidateTag(`equipment-${characterId}`);
    // Se retorna el primer elemento (suponiendo que el endpoint devuelve un array)
    return equipmentSlots[0];
  } catch (error) {
    console.error("Error fetching equipment slots:", error);
    return {}; // Retornamos objeto vacío en caso de error
  }
};

/**
 * Desequipa un ítem del personaje en un slot dado.
 */
export const unequipItem = async (characterId: number, slot: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/equipment/${characterId}/unequip/${slot}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error unequipping item: ${response.statusText}`);
    }
    // Revalidamos la caché del equipo para este character
    revalidateTag(`equipment-${characterId}`);
    return await response.json();
  } catch (error) {
    console.error("Error unequipping item:", error);
    throw error;
  }
};

/**
 * Obtiene el nombre de un ítem dado su ID.
 */
export const getItemNameById = async (itemId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/items/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching item name: ${response.statusText}`);
    }
    const itemData = await response.json();
    return itemData.name;
  } catch (error) {
    console.error("Error fetching item name:", error);
    return "Unknown Item";
  }
};

/**
 * Equipar un ítem en el equipo del personaje.
 * Se envía en el body: { slot, itemId, itemInstanceId }
 * donde itemInstanceId puede ser un número o null.
 */
export const equipItem = async (
  characterId: number,
  slot: string,
  itemId: number,
  itemInstanceId: number | null
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/equipment/${characterId}/equip`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
        body: JSON.stringify({
          // La API espera que se llame "slot" y "itemId" y "itemInstanceId"
          slot,
          itemId,
          itemInstanceId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to equip item: ${response.statusText}`);
    }
    // Revalidamos la caché del equipo para este character
    revalidateTag(`equipment-${characterId}`);
    return await response.json();
  } catch (error) {
    console.error("Error equipping item:", error);
    throw error;
  }
};

/**
 * Obtiene el menú de equipamiento de un personaje.
 * Se asume que el endpoint devuelve un array y se toma el primer elemento,
 * que es el objeto que mapea cada slot con el ítem equipado.
 */
export const getEquipmentMenu = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/equipment/menu/${characterId}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching equipment menu: ${response.statusText}`);
    }
    const equipmentMenu = await response.json();
    // Se retorna el primer elemento (según el comportamiento esperado)
    return equipmentMenu;
  } catch (error) {
    console.error("Error fetching equipment menu:", error);
    throw error;
  }
};
