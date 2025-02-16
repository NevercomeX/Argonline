// src/components/GameComponents/Characters/Details/EquipmentPageClient.tsx
"use client";

import React, { useState } from "react";
import { unequipItem } from "@/utils/gameUtils/equipmentApi";

export interface EquipmentSlot {
  slot: string; // Ej: "WEAPON", "ARMOR", etc.
  item?: {
    id: number;
    name: string;
    itemIcon: string;
    isInstance: boolean;
    templateId?: number;
  } | null;
}

interface EquipmentPageClientProps {
  characterId: number;
  equipmentSlots: Record<string, EquipmentSlot>; // El menú es un objeto con claves de slot
  characterName: string;
  characterSprite: string;
}

const EquipmentPageClient: React.FC<EquipmentPageClientProps> = ({
  characterId,
  equipmentSlots,
  characterName,
  characterSprite,
}) => {
  // Convertimos el objeto de equipmentSlots en un array ordenado según los slots definidos
  const slotOrder = [
    "HEAD_TOP",
    "HEAD_MID",
    "HEAD_LOW",
    "ARMOR",
    "WEAPON",
    "SHIELD",
    "GARMENT",
    "SHOES",
    "ACCESSORY1",
    "ACCESSORY2",
    "AMMO",
  ];
  const [slots, setSlots] = useState<EquipmentSlot[]>(
    slotOrder.map((slot) => equipmentSlots[slot] || { slot, item: null })
  );

  const formatSlotName = (slot: string): string => {
    // Por ejemplo, convierte "HEAD_TOP" en "Head Top"
    return slot
      .split("_")
      .map((s) => s.charAt(0) + s.slice(1).toLowerCase())
      .join(" ");
  };

  const handleUnequip = async (slotName: string) => {
    // Buscamos el slot a desequipar
    const slotToUpdate = slots.find((s) => s.slot === slotName);
    if (!slotToUpdate || !slotToUpdate.item) {
      console.log("Este slot está vacío");
      return;
    }
    try {
      await unequipItem(characterId, slotName);
      // Actualizamos localmente el slot a vacío
      setSlots((prevSlots) =>
        prevSlots.map((s) => (s.slot === slotName ? { ...s, item: null } : s))
      );
    } catch (error) {
      console.error("Error al desequipar ítem:", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center space-y-4 border p-4 rounded-lg bg-gray-50 shadow">
      <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Columna izquierda */}
        <div className="flex flex-col space-y-4">
          {slots.slice(0, 5).map((slot) => (
            <div
              key={slot.slot}
              className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm relative"
            >
              <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                {slot.item ? (
                  <img
                    src={
                      slot.item.isInstance
                        ? `/items/template/${slot.item.templateId}.gif`
                        : `/items/${slot.item.itemIcon}/${slot.item.id}.gif`
                    }
                    alt={slot.item.name}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Empty</div>
                )}
              </div>
              <div className="flex-1 hidden md:flex flex-col">
                <p className="text-lg font-semibold">
                  {slot.item ? slot.item.name : "Vacío"}
                </p>
                <p className="text-sm text-gray-500">
                  {formatSlotName(slot.slot)}
                </p>
              </div>
              {slot.item && (
                <button
                  onClick={() => handleUnequip(slot.slot)}
                  className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Unequip
                </button>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">
                    {slot.item ? slot.item.name : "Vacío"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {formatSlotName(slot.slot)}
                  </p>
                  {slot.item && (
                    <button
                      onClick={() => handleUnequip(slot.slot)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Unequip
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Columna central: imagen y nombre del personaje */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={characterSprite}
            alt={characterName}
            className="mx-auto mt-4 w-32 h-48 object-contain"
          />
          <h1 className="text-3xl font-semibold">{characterName}</h1>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col space-y-4">
          {slots.slice(5, 10).map((slot) => (
            <div
              key={slot.slot}
              className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm relative"
            >
              <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                {slot.item ? (
                  <img
                    src={
                      slot.item.isInstance
                        ? `/items/template/${slot.item.templateId}.gif`
                        : `/items/${slot.item.itemIcon}/${slot.item.id}.gif`
                    }
                    alt={slot.item.name}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Empty</div>
                )}
              </div>
              <div className="flex-1 hidden md:flex flex-col">
                <p className="text-lg font-semibold">
                  {slot.item ? slot.item.name : "Vacío"}
                </p>
                <p className="text-sm text-gray-500">
                  {formatSlotName(slot.slot)}
                </p>
              </div>
              {slot.item && (
                <button
                  onClick={() => handleUnequip(slot.slot)}
                  className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Unequip
                </button>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">
                    {slot.item ? slot.item.name : "Vacío"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {formatSlotName(slot.slot)}
                  </p>
                  {slot.item && (
                    <button
                      onClick={() => handleUnequip(slot.slot)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Unequip
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Si existe un slot adicional (por ejemplo, "AMMO"), se muestra en la parte inferior */}
      {slots[10] && (
        <div className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm w-full max-w-2xl relative">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            {slots[10].item ? (
              <img
                src={
                  slots[10].item.isInstance
                    ? `/items/template/${slots[10].item.templateId}.gif`
                    : `/items/${slots[10].item.itemIcon}/${slots[10].item.id}.gif`
                }
                alt={slots[10].item.name}
                className="w-12 h-12 object-cover"
              />
            ) : (
              <div className="text-gray-400">Empty</div>
            )}
          </div>
          <div className="flex-1 hidden md:flex flex-col">
            <p className="text-lg font-semibold">
              {slots[10].item ? slots[10].item.name : "Vacío"}
            </p>
            <p className="text-sm text-gray-500">
              {formatSlotName(slots[10].slot)}
            </p>
          </div>
          {slots[10].item && (
            <button
              onClick={() => handleUnequip(slots[10].slot)}
              className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Unequip
            </button>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
            <div className="text-center">
              <p className="text-lg font-semibold text-white">
                {slots[10].item ? slots[10].item.name : "Vacío"}
              </p>
              <p className="text-sm text-gray-300">
                {formatSlotName(slots[10].slot)}
              </p>
              {slots[10].item && (
                <button
                  onClick={() => handleUnequip(slots[10].slot)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Unequip
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentPageClient;
