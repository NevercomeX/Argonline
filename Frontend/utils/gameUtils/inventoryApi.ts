//utils/gameUtils/inventoryApi.ts

import { revalidateTag } from "next/cache";

/**
 * Obtiene el inventario de un personaje.
 */
export const getInventory = async (characterId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/inventory/${characterId}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching inventory: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

/**
 * Obtiene el ítem equipado en un slot específico para un personaje.
 */
export const getEquipmentSlotByCharacterIdAndSlot = async (
  characterId: number,
  slot: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/equipment/${characterId}/${slot}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching equipment slot: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching equipment slot:", error);
    return null;
  }
};

/**
 * Obtiene la instancia de un ítem dado su ID.
 */
export const getItemInstanceById = async (itemId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_CHAR_URL}/item-instances/${itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching item instance: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item instance:", error);
    return null;
  }
};
