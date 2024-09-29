// app/utils/equipmentApi.ts

import { revalidateTag } from 'next/cache';

// Obtener los slots de equipamiento de un personaje
export const getEquipmentSlotsByCharacterId = async (characterId: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/equipment/character/${characterId}`, {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',  // Deshabilitar el cache en el request
            },
        });
      if (response.ok) {
        const equipmentSlots = await response.json();
        revalidateTag(`equipment-${characterId}`);
        return equipmentSlots[0]; // Suponiendo que devuelve un solo objeto de equipo
      } else {
        throw new Error("Error fetching equipment slots");
      }
    } catch (error) {
      console.error("Error fetching equipment slots:", error);
      return {};
    }
  };
  
  // Desequipar un ítem del personaje


  export const unequipItem = async (characterId: number, slotType: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/equipment/${characterId}/unequip/${slotType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'no-cache',
          },
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
  
  
  // Obtener nombre del ítem por ID
  export const getItemNameById = async (itemId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${itemId}`,  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const itemData = await response.json();
        return itemData.name;
      } else {
        throw new Error("Error fetching item name");
      }
    } catch (error) {
      console.error("Error fetching item name:", error);
      return "Unknown Item";
    }
  };
  