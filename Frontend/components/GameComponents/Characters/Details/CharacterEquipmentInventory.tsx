// src/components/GameComponents/Characters/Details/CharacterEquipmentInventory.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { equipItem, unequipItem } from "@/utils/gameUtils/equipmentApi";
import { getInventory } from "@/utils/gameUtils/inventoryApi";

// Definimos dos tipos para drag & drop:
const INVENTORY_ITEM_TYPE = "INVENTORY_ITEM";
const EQUIPPED_ITEM_TYPE = "EQUIPPED_ITEM";

// Tipos de datos
export interface EquipmentSlot {
  slot: string; // Ej: "WEAPON", "ARMOR", etc.
  item: {
    id: number;
    name: string;
    sprite: string;
  } | null;
}

export interface InventoryItem {
  itemId: number;
  instanceId: number | null;
  name: string;
  quantity: number;
  sprite: string;
  equipable: boolean;
  equipmentSlot: string;
  isInstance: boolean;
}

// Draggable para ítems en el inventario
const DraggableInventoryItem: React.FC<{ item: InventoryItem }> = ({
  item,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: INVENTORY_ITEM_TYPE,
      item: { ...item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  );

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="border rounded p-2 flex flex-col items-center cursor-move"
    >
      <Image
        src={`/items` + item.sprite}
        alt={item.name}
        width={48}
        height={48}
        className="object-contain"
      />
      <p className="text-xs font-medium mt-1">{item.name}</p>
      <p className="text-xs text-gray-500">x {item.quantity}</p>
      {item.equipable && item.equipmentSlot && (
        <p className="text-xs italic text-gray-600">{item.equipmentSlot}</p>
      )}
    </div>
  );
};

// Draggable para ítems ya equipados (dentro de un slot)
const DraggableEquippedItem: React.FC<{
  item: { id: number; name: string; sprite: string };
  slot: string;
}> = ({ item, slot }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: EQUIPPED_ITEM_TYPE,
      item: { slot },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [slot]
  );
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      <Image
        src={`/items` + item.sprite}
        alt={item.name}
        width={64}
        height={64}
        className="object-contain"
      />
      <p className="text-xs mt-1">{item.name}</p>
    </div>
  );
};

// Componente drop target para cada equipment slot
const DroppableEquipmentSlot: React.FC<{
  slotData: EquipmentSlot;
  onDropItem: (droppedItem: InventoryItem, targetSlot: string) => void;
  onUnequip: (slot: string) => void;
}> = ({ slotData, onDropItem, onUnequip }) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: INVENTORY_ITEM_TYPE, // Este slot acepta ítems del inventario
      drop: (draggedItem: InventoryItem) => {
        if (draggedItem.equipmentSlot === slotData.slot) {
          onDropItem(draggedItem, slotData.slot);
        } else {
          console.warn("El ítem no puede equiparse en este slot.");
        }
      },
      canDrop: (draggedItem: InventoryItem) =>
        draggedItem.equipmentSlot === slotData.slot,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [slotData, onDropItem]
  );

  const formatSlotName = (slot: string): string =>
    slot
      .split("_")
      .map((s) => s.charAt(0) + s.slice(1).toLowerCase())
      .join(" ");

  return (
    <div
      ref={drop}
      className={`border rounded p-2 flex flex-col items-center ${
        isOver && canDrop ? "bg-green-100" : ""
      }`}
    >
      <p className="text-sm font-medium">{formatSlotName(slotData.slot)}</p>
      {slotData.item ? (
        <DraggableEquippedItem item={slotData.item} slot={slotData.slot} />
      ) : (
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
          Vacío
        </div>
      )}
      {slotData.item && (
        <button
          onClick={() => onUnequip(slotData.slot)}
          className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Desequipar
        </button>
      )}
    </div>
  );
};

// Área droppable para desequipar (la sección de inventario)
const InventoryDropArea: React.FC<{
  onDropEquipped: (slot: string) => void;
  children: React.ReactNode;
}> = ({ onDropEquipped, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: EQUIPPED_ITEM_TYPE,
      drop: (dragged: { slot: string }) => {
        onDropEquipped(dragged.slot);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDropEquipped]
  );

  return (
    <div
      ref={drop}
      className={`p-2 border rounded ${isOver && canDrop ? "bg-blue-100" : ""}`}
    >
      {children}
    </div>
  );
};

interface CharacterEquipmentInventoryProps {
  characterId: number;
  characterName: string;
  characterSprite: string;
  initialEquipmentSlots: EquipmentSlot[];
  initialInventoryItems: InventoryItem[];
}

const CharacterEquipmentInventory: React.FC<
  CharacterEquipmentInventoryProps
> = ({
  characterId,
  characterName,
  characterSprite,
  initialEquipmentSlots,
  initialInventoryItems,
}) => {
  const [equipmentSlots, setEquipmentSlots] = useState<EquipmentSlot[]>(
    initialEquipmentSlots
  );
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(
    initialInventoryItems
  );

  // Función para desequipar (usada tanto en botón como en drop)
  const handleUnequip = async (slot: string) => {
    try {
      await unequipItem(characterId, slot);
      // Actualizar el equipment: vaciar el slot
      setEquipmentSlots((prev) =>
        prev.map((s) => (s.slot === slot ? { ...s, item: null } : s))
      );
      // Refrescar inventario
      const refreshedInventory = await getInventory(characterId);
      setInventoryItems(refreshedInventory);
    } catch (error) {
      console.error("Error al desequipar ítem:", error);
    }
  };

  // Función para equipar un ítem (cuando se suelta desde el inventario en un slot)
  const handleDropEquip = async (
    droppedItem: InventoryItem,
    targetSlot: string
  ) => {
    try {
      await equipItem(
        characterId,
        targetSlot,
        droppedItem.itemId,
        droppedItem.isInstance ? droppedItem.instanceId : null
      );
      // Actualizar el equipment: asignar el ítem al slot correspondiente.
      setEquipmentSlots((prev) =>
        prev.map((s) =>
          s.slot === targetSlot
            ? {
                ...s,
                item: {
                  id: droppedItem.isInstance
                    ? droppedItem.instanceId!
                    : droppedItem.itemId,
                  name: droppedItem.name,
                  sprite: droppedItem.sprite,
                },
              }
            : s
        )
      );
      // Actualizar el inventario: disminuir la cantidad, eliminar si queda 0.
      setInventoryItems((prev) =>
        prev
          .map((i) =>
            i.itemId === droppedItem.itemId &&
            i.instanceId === droppedItem.instanceId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    } catch (error) {
      console.error("Error al equipar ítem:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Encabezado con nombre y sprite del personaje */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold">{characterName}</h1>
        <Image
          src={characterSprite}
          alt={characterName}
          width={150}
          height={150}
          className="object-contain mt-2"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sección de Equipamiento */}
        <div className="flex-1 border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Equipamiento</h2>
          <div className="grid grid-cols-3 gap-4">
            {equipmentSlots.map((slot, index) => (
              <DroppableEquipmentSlot
                key={index}
                slotData={slot}
                onDropItem={handleDropEquip}
                onUnequip={handleUnequip}
              />
            ))}
          </div>
        </div>

        {/* Sección de Inventario: la envolvemos en un drop area que acepta EQUIPPED_ITEM para desequipar */}
        <InventoryDropArea onDropEquipped={(slot) => handleUnequip(slot)}>
          <div className="flex-1 border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Inventario</h2>
            <div className="grid grid-cols-4 gap-4">
              {inventoryItems.map((item) => (
                <DraggableInventoryItem
                  key={`${item.itemId}-${item.instanceId || "normal"}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </InventoryDropArea>
      </div>
    </div>
  );
};

export default CharacterEquipmentInventory;
