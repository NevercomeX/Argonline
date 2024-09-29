"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getInventory,
  getEquipmentSlotByCharacterIdAndSlot,
  unequipItem,
  getItemInstanceById,
  equipItem,
} from "../../utils/inventoryApi";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  equipable: boolean;
  equipmentSlot?: string;
  isInstance: boolean;
}

interface InventoryPageProps {
  characterId?: string;
  debug?: boolean;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ characterId, debug = true }) => {
  // Si `debug` es true, usar id 1, de lo contrario, usar `characterId` recibido como prop
  const effectiveCharacterId = debug ? "1" : characterId || "1"; // Si `characterId` es undefined, usamos "1" como fallback

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInventory = async () => {
      if (!effectiveCharacterId) {
        console.error("Character ID is required");
        return;
      }

      const inventory = await getInventory(effectiveCharacterId);
      const items = inventory.map((inventoryItem: any) => {
        const itemInstance = inventoryItem.itemInstance;
        const item = inventoryItem.item;

        return {
          id: inventoryItem.itemInstanceId || inventoryItem.itemId,
          name: itemInstance ? itemInstance.itemTemplate.name : item.name,
          quantity: inventoryItem.quantity,
          equipable: itemInstance
            ? itemInstance.itemTemplate.equipable
            : item.equipable,
          equipmentSlot: itemInstance
            ? itemInstance.itemTemplate.equipmentSlot
            : item.equipmentSlot,
          isInstance: !!inventoryItem.itemInstanceId,
        };
      });
      setInventoryItems(items);
    };

    fetchInventory();
  }, [effectiveCharacterId]);

  const handleEquipItem = async (item: InventoryItem) => {
    if (item.equipable) {
      try {
        // Verificar si ya hay un ítem equipado en el mismo slot y desequiparlo
        const currentEquipment = await getEquipmentSlotByCharacterIdAndSlot(
          effectiveCharacterId,
          item.equipmentSlot!
        );

        if (currentEquipment) {
          await unequipItem(effectiveCharacterId, item.equipmentSlot!);
        }

        // Equipar el ítem seleccionado
        if (item.isInstance) {
          const selectedItemInstance = await getItemInstanceById(item.id);
          if (selectedItemInstance) {
            await equipItem(
              effectiveCharacterId,
              selectedItemInstance.itemTemplate.equipmentSlot,
              selectedItemInstance.id,
              true
            );
          }
        } else {
          await equipItem(effectiveCharacterId, item.equipmentSlot!, item.id, false);
        }

        router.refresh(); // Refrescar la página para actualizar el estado del inventario
      } catch (error) {
        console.error("Error equipping item:", error);
      }
    } else {
      alert("Este ítem no es equipable!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      {inventoryItems.length === 0 ? (
        <p>No hay ítems en tu inventario.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inventoryItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleEquipItem(item)}
            >
              <p className="text-lg font-medium">
                {item.name} x {item.quantity}{" "}
                {item.equipable && item.equipmentSlot ? `(${item.equipmentSlot})` : ""}
              </p>
            </div>
          ))}
        </div>
      )}
      {selectedItem && (
        <div className="mt-4">
          <p>Ítem seleccionado: {selectedItem.name}</p>
        </div>
      )}
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Volver
      </button>
    </div>
  );
};

export default InventoryPage;
