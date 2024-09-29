"use client";

import React, { useState } from 'react';
import { unequipItem } from '../../../app/utils/equipmentApi';
import Image from 'next/image';

interface EquipmentSlot {
  slotName: string;
  displayName: string;
  itemId: number | null;
  itemName: string;
}

interface EquipmentPageClientProps {
  characterId: number;
  equipmentSlots: EquipmentSlot[];
}

const EquipmentPageClient: React.FC<EquipmentPageClientProps> = ({
  characterId,
  equipmentSlots,
}) => {
  const [slots, setSlots] = useState(equipmentSlots); // Manejamos el estado de los slots

  const handleUnequip = async (slotName: string) => {
    const slot = slots.find((s) => s.slotName === slotName);

    // Validaciones para asegurarnos de que el slot es válido
    if (!slot || slot.itemId === null) {
      console.log("This slot is empty!");
      return;
    }

    // Desequipar el ítem
    await unequipItem(characterId, slotName);

    // Actualizamos el estado de los slots para reflejar el cambio
    const updatedSlots = slots.map((s) =>
      s.slotName === slotName ? { ...s, itemId: null, itemName: 'Vacío' } : s
    );
    setSlots(updatedSlots);
  };

  return (
    <div className="relative bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <Image src="/characters/1.gif" alt="Character" width={200} height={400} />
      </div>

      {/* Equipamiento - Mapa de los slots */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {slots.map((slot) => (
          <div key={slot.slotName} className="relative group">
            <div className="w-16 h-16 border-2 border-gray-600 rounded-lg flex items-center justify-center">
              {slot.itemId ? (
                <Image
                  src={`/images/items/${slot.itemId}.png`}
                  alt={slot.itemName}
                  width={64}
                  height={64}
                />
              ) : (
                <div className="text-gray-400">Vacío</div>
              )}
            </div>

            {slot.itemId && (
              <button
                onClick={() => handleUnequip(slot.slotName)}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-700"
              >
                Desequipar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentPageClient;
