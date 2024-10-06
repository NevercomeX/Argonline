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
    equipmentSlot: string
  ) => {
    try {
      const response = await fetch(`http://localhost:4001/api/equipment/${characterId}/${equipmentSlot}`);
      if (response.ok) {
        return response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching equipment slot:", error);
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
        revalidateTag(`equipment-${characterId}`);
      } else {
        throw new Error("Error unequipping item");
      }
    } catch (error) {
      console.error("Error unequipping item:", error);
    }
  };
  
  export const getItemInstanceById = async (itemId: number) => {
    try {
      const response = await fetch(`http://localhost:4001/api/item-instance/${itemId}`,{
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
      await fetch(`http://localhost:4001/api/equipment/${characterId}/equip`, {
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
    } catch (error) {
      console.error("Error equipping item:", error);
    }
  };
  