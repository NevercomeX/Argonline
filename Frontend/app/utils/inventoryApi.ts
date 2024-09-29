// app/utils/inventoryApi.ts

export const getInventory = async (characterId: number) => {
    try {
      const response = await fetch(`http://localhost:4001/api/inventory/${characterId}`);
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
    equipmentSlot: number
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
  
  export const unequipItem = async (characterId: number, equipmentSlot: number) => {
    try {
      await fetch(`http://localhost:4001/api/equipment/${characterId}/${equipmentSlot}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error unequipping item:", error);
    }
  };
  
  export const getItemInstanceById = async (itemId: number) => {
    try {
      const response = await fetch(`http://localhost:4001/api/item-instance/${itemId}`);
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
    equipmentSlot: number,
    itemId: number,
    isInstance: boolean
  ) => {
    try {
      await fetch(`http://localhost:4001/api/equipment/${characterId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  