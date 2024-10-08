"use client";

import React, { useState } from 'react';
import { unequipItem } from '../../../app/utils/equipmentApi';
import Image from 'next/image';

interface EquipmentSlot {
  slotName: string;
  displayName: string;
  itemId: number | null;  // El ID del ítem o instancia
  itemName: string;
  isInstance: boolean;    // Si es una instancia de un ítem
  itemIcon: string;       // El directorio del ítem (e.g., "armor/")
  templateId?: number | null;    // ID del template en caso de instancia
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
    if (!slot || slot.templateId === null) {
      console.log("This slot is empty!");
      return;
    }

    // Desequipar el ítem
    await unequipItem(characterId, slotName);

    // Actualizamos el estado de los slots para reflejar el cambio
    const updatedSlots = slots.map((s) =>
      s.slotName === slotName ? { ...s, templateId: null, itemName: 'Vacío' } : s
    );
    setSlots(updatedSlots);
  };

  return (
    <div className="flex">
      <div className='grid justify-items-center items-center'>
      <Image src="/characters/1.gif" alt="Character" width={200} height={400} />
      </div>
      {/* Equipamiento - Mapa de los slots */}
      <div className="grid grid-cols-3 gap-8 mt-2">
        {slots.map((slot) => (
          <div key={slot.slotName} className="relative group">
            <div className="w-16 h-16 border-2 border-gray-600 rounded-lg flex items-center justify-center">
              {slot.templateId ? (
                <img
                  // Condicional para mostrar la imagen correcta según sea ítem normal o instancia
                  src={
                    slot.isInstance
                      ? `/items/template/${slot.templateId}.gif`   // Para instancias de ítems
                      : `/items/${slot.itemIcon}/${slot.templateId}.gif`  // Para ítems normales
                  }
                  alt={slot.itemName}
                  width={64}
                  height={64}
                />
              ) : (
                <div className="text-gray-400"></div>
              )}
            </div>

            {slot.templateId && (
              <button
                onClick={() => handleUnequip(slot.slotName)}
                className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-700"
              >
                unequip
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default EquipmentPageClient;
