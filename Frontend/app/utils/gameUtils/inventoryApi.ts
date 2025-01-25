import { revalidateTag } from 'next/cache';

// app/utils/inventoryApi.ts
export const getInventory = async (characterId: number) => {
  try {
    const response = await fetch(`http://localhost:4001/api/inventory/${characterId}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-store',
      },
      cache: 'no-store', // Deshabilitar la caché
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error fetching inventory");
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

  
export const getEquipmentSlotByCharacterIdAndSlot = async (
  characterId: number,
  slotType: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/equipment/${characterId}/${slotType}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching equipment slot: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching equipment slot:`, error);
    return null;
  }
};

  export const unequipItem = async (characterId: number, slotType: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/equipment/${characterId}/unequip/${slotType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'no-cache',
          },
          cache: 'no-store',
        }
      );
      if (response.ok) {
        // Invalida la caché del slot de equipo en particular

      } else {
        throw new Error("Error unequipping item");
      }
    } catch (error) {
      console.error("Error unequipping item:", error);
    }
  };
  
  export const getItemInstanceById = async (itemId: number) => {
    try {
      const response = await fetch(`http://localhost:4001/api/item-instances/${itemId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching item instance");
      }
    } catch (error) {
      console.error("Error fetching item instance:", error);
      return null;
    }
  };
  
  export const equipItem = async (
    characterId: number,
    equipmentSlot: string,
    itemId: number,
    isInstance: boolean
  ) => {
    try {
  
      const response = await fetch(`http://localhost:4001/api/equipment/${characterId}/equip`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
        body: JSON.stringify({
          equipmentSlot,
          itemId,
          isInstance,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to equip item: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error equipping item:", error);
    }
  };