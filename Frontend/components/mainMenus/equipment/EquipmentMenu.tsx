"use client";

import React, { useState } from 'react';
import { unequipItem } from '../../../app/utils/gameUtils/equipmentApi';

interface EquipmentSlot {
  slotName: string;
  displayName: string;
  itemId: number | null;
  itemName: string;
  isInstance: boolean;
  itemIcon: string;
  templateId?: number | null;
}

interface EquipmentPageClientProps {
  characterId: number;
  equipmentSlots: EquipmentSlot[];
  characterName: string;
  characterSprite: string;
}

const EquipmentPageClient: React.FC<EquipmentPageClientProps> = ({
  characterId,
  equipmentSlots,
  characterName,
  characterSprite,
}) => {
  const [slots, setSlots] = useState(equipmentSlots);

  const formatSlotName = (slotName: string): string => {
    return slotName
      .replace(/slot/gi, '')
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const handleUnequip = async (slotName: string) => {
    const slot = slots.find((s) => s.slotName === slotName);

    if (!slot || slot.templateId === null) {
      console.log("This slot is empty!");
      return;
    }

    try {
      await unequipItem(characterId, slotName);

      // Actualiza solo el slot que ha cambiado
      setSlots((prevSlots) =>
        prevSlots.map((s) =>
          s.slotName === slotName ? { ...s, templateId: null, itemName: 'Vacío' } : s
        )
      );
    } catch (error) {
      console.error("Failed to unequip item:", error);
    }
  };

  const leftSlots = slots.slice(0, 5);
  const rightSlots = slots.slice(5, 10);
  const centerSlot = slots[10];

  return (
    <div className="mt-4 flex flex-col items-center space-y-4 border p-4 rounded-lg bg-gray-50 shadow">
      <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Columna izquierda: 5 slots */}
        <div className="flex flex-col space-y-4">
          {leftSlots.map((slot) => (
            <div
              key={slot.slotName}
              className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm relative"
            >
              <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                {slot.templateId ? (
                  <img
                    src={
                      slot.isInstance
                        ? `/items/template/${slot.templateId}.gif`
                        : `/items/${slot.itemIcon}/${slot.templateId}.gif`
                    }
                    alt={slot.itemName}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Empty</div>
                )}
              </div>

              <div className="flex-1 hidden md:flex flex-col">
                <p className="text-lg font-semibold">{slot.itemName}</p>
                <p className="text-sm text-gray-500">{formatSlotName(slot.slotName)}</p>
              </div>

              {slot.templateId && (
                <button
                  onClick={() => handleUnequip(slot.slotName)}
                  className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Unequip
                </button>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{slot.itemName}</p>
                  <p className="text-sm text-gray-300">{formatSlotName(slot.slotName)}</p>
                  {slot.templateId && (
                    <button
                      onClick={() => handleUnequip(slot.slotName)}
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

        {/* Columna central: Imagen del personaje */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={characterSprite}
            alt={characterName}
            className="mx-auto mt-4 w-32 h-48 object-contain"
          />
          <h1 className="text-3xl font-semibold">{characterName}</h1>
        </div>

        {/* Columna derecha: 5 slots */}
        <div className="flex flex-col space-y-4">
          {rightSlots.map((slot) => (
            <div
              key={slot.slotName}
              className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm relative"
            >
              <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                {slot.templateId ? (
                  <img
                    src={
                      slot.isInstance
                        ? `/items/template/${slot.templateId}.gif`
                        : `/items/${slot.itemIcon}/${slot.templateId}.gif`
                    }
                    alt={slot.itemName}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Empty</div>
                )}
              </div>

              <div className="flex-1 hidden md:flex flex-col">
                <p className="text-lg font-semibold">{slot.itemName}</p>
                <p className="text-sm text-gray-500">{formatSlotName(slot.slotName)}</p>
              </div>

              {slot.templateId && (
                <button
                  onClick={() => handleUnequip(slot.slotName)}
                  className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Unequip
                </button>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{slot.itemName}</p>
                  <p className="text-sm text-gray-300">{formatSlotName(slot.slotName)}</p>
                  {slot.templateId && (
                    <button
                      onClick={() => handleUnequip(slot.slotName)}
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

      {/* Slot adicional en la parte inferior */}
      {centerSlot && (
        <div className="group flex items-center space-x-4 p-4 border rounded-lg shadow-sm w-full max-w-2xl relative">
          <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            {centerSlot.templateId ? (
              <img
                src={
                  centerSlot.isInstance
                    ? `/items/template/${centerSlot.templateId}.gif`
                    : `/items/${centerSlot.itemIcon}/${centerSlot.templateId}.gif`
                }
                alt={centerSlot.itemName}
                className="w-12 h-12 object-cover"
              />
            ) : (
              <div className="text-gray-400">Empty</div>
            )}
          </div>

          <div className="flex-1 hidden md:flex flex-col">
            <p className="text-lg font-semibold">{centerSlot.itemName}</p>
            <p className="text-sm text-gray-500">{formatSlotName(centerSlot.slotName)}</p>
          </div>

          {centerSlot.templateId && (
            <button
              onClick={() => handleUnequip(centerSlot.slotName)}
              className="hidden md:flex px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Unequip
            </button>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
            <div className="text-center">
              <p className="text-lg font-semibold text-white">{centerSlot.itemName}</p>
              <p className="text-sm text-gray-300">{formatSlotName(centerSlot.slotName)}</p>
              {centerSlot.templateId && (
                <button
                  onClick={() => handleUnequip(centerSlot.slotName)}
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