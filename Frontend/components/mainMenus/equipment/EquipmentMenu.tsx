"use client";

import React, { useState } from 'react';
import { unequipItem } from '../../../app/utils/equipmentApi';
import { useRouter } from 'next/navigation';

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

const EquipmentPageClient: React.FC<EquipmentPageClientProps> = ({ characterId, equipmentSlots }) => {
  const [slots, setSlots] = useState(equipmentSlots);
  const router = useRouter();

  const handleUnequip = async (slotName: string) => {  // slotName es string
    const slot = slots.find((s) => s.slotName === slotName);
    if (!slot || slot.itemId === null) {
      alert("This slot is empty!");
      return;
    } else if (slot.itemId === 0) {
      alert("You can't unequip this item!");
      return;
    } else if (slot.itemId === -1) {
      alert("This slot is locked!");
      return;
    }

    // Llamar a la función para desequipar el ítem pasando slotName como string
    await unequipItem(characterId, slotName);  // slotName como string
    alert(`You unequipped ${slot.itemName}!`);

    // Actualizar el estado para reflejar el ítem desequipado
    const updatedSlots = slots.map((s) =>
      s.slotName === slotName ? { ...s, itemId: null, itemName: 'Vacío' } : s
    );
    setSlots(updatedSlots);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Equipo del Personaje</h1>
      <div className="grid grid-cols-1 gap-4">
        {slots.map((slot) => (
          <div key={slot.slotName} className="p-4 border rounded-lg shadow-md">
            <p className="text-lg font-medium">
              {slot.displayName}: {slot.itemName !== 'Vacío' ? slot.itemName : 'Vacío'}
            </p>
            {slot.itemId !== null && slot.itemId > 0 && (
              <button
                onClick={() => handleUnequip(slot.slotName)}  // slotName como string
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Desequipar
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Volver
      </button>
    </div>
  );
};

export default EquipmentPageClient;
