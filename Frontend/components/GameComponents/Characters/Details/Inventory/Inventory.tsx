// components/CharacterEquipmentInventory.tsx
import React from "react";
import Image from "next/image";

export interface EquipmentItem {
  slot: string; // Ej: "WEAPON", "ARMOR", etc.
  item?: {
    id: number;
    name: string;
    sprite: string; // Ruta o URL de la imagen del ítem
  } | null;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  sprite: string; // Ruta o URL de la imagen del ítem
  equipable: boolean;
  equipmentSlot?: string;
}

interface CharacterEquipmentInventoryProps {
  characterName: string;
  characterSprite: string;
  equipmentSlots: EquipmentItem[];
  inventoryItems: InventoryItem[];
}

const CharacterEquipmentInventory: React.FC<
  CharacterEquipmentInventoryProps
> = ({ characterName, characterSprite, equipmentSlots, inventoryItems }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Título y sprite del personaje */}
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
              <div
                key={index}
                className="border rounded p-2 flex flex-col items-center"
              >
                <p className="text-sm font-medium">{slot.slot}</p>
                {slot.item ? (
                  <>
                    <Image
                      src={slot.item.sprite}
                      alt={slot.item.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    <p className="text-xs mt-1">{slot.item.name}</p>
                  </>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
                    Empty
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Inventario */}
        <div className="flex-1 border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Inventario</h2>
          <div className="grid grid-cols-4 gap-4">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="border rounded p-2 flex flex-col items-center"
              >
                <Image
                  src={item.sprite}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <p className="text-xs font-medium mt-1">{item.name}</p>
                <p className="text-xs text-gray-500">x {item.quantity}</p>
                {item.equipable && item.equipmentSlot && (
                  <p className="text-xs italic text-gray-600">
                    {item.equipmentSlot}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEquipmentInventory;
