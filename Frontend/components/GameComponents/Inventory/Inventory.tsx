"use client";

import React, { useState } from "react";
import {
  equipItem,
  getEquipmentSlotByCharacterIdAndSlot,
  getItemInstanceById,
  unequipItem,
} from "../../../utils/gameUtils/inventoryApi";

interface InventoryItem {
  id: number;
  templateId: number;
  name: string;
  quantity: number;
  equipable: boolean;
  equipmentSlot?: string;
  isInstance: boolean;
  itemIcon: string;
}

interface InventoryGridProps {
  characterId: number;
  inventoryItems: InventoryItem[];
}

const InventoryGrid: React.FC<InventoryGridProps> = ({
  characterId,
  inventoryItems,
}) => {
  const [items, setItems] = useState(inventoryItems); // Manejamos el estado del inventario

  const handleEquipItem = async (item: InventoryItem) => {
    if (item.equipable) {
      try {
        // Verificar si ya hay un ítem equipado en el mismo slot y desequiparlo
        const currentEquipment = await getEquipmentSlotByCharacterIdAndSlot(
          characterId,
          item.equipmentSlot!,
        );
        console.log(item.equipmentSlot, characterId);
        console.log("Current equipment in slot:", currentEquipment); // <-- Depura el equipo actual

        if (currentEquipment) {
          console.log(await unequipItem(characterId, item.equipmentSlot!));
        }

        // Equipar el ítem seleccionado
        if (item.isInstance) {
          const selectedItemInstance = await getItemInstanceById(item.id);
          console.log("Selected item instance:", selectedItemInstance); // <-- Verifica la instancia

          if (selectedItemInstance) {
            await equipItem(
              characterId,
              selectedItemInstance.itemTemplate.equipmentSlot,
              selectedItemInstance.id,
              true,
            );
          }
        } else {
          console.log(
            "Equipping normal item:",
            characterId,
            item.equipmentSlot,
            item.id,
          );
          await equipItem(characterId, item.equipmentSlot!, item.id, false);
        }

        // Actualizar inventario localmente
        const updatedItems = items
          .map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0);

        setItems(updatedItems);
        console.log("Updated inventory after equip:", updatedItems); // <-- Depura el inventario después del equipamiento
      } catch (error) {
        console.error("Error equipping item:", error);
      }
    } else {
      alert("Este ítem no es equipable!");
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 my-4 items-center border p-4 rounded-lg bg-gray-50 shadow">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative p-2 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
          onClick={() => handleEquipItem(item)}
        >
          <img
            src={
              item.isInstance
                ? `/items/template/${item.templateId}.gif` // Si es instancia
                : `/items/${item.itemIcon}/${item.id}.gif` // Si es ítem normal
            }
            alt={item.name}
            className="w-8 h-8 object-cover"
          />
          {/* Mostrar más información al pasar el ratón */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-75 text-white transition-opacity duration-200">
            <div className="text-center">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs">x {item.quantity}</p>
              {item.equipable && (
                <p className="text-xs italic">
                  Equipable ({item.equipmentSlot})
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryGrid;
