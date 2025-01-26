// components/Characters/Details/EquipmentInventorySection.tsx
import React from "react";
import EquipmentPageClient from "../../Equipment/EquipmentMenu";
import InventoryGrid from "../../Inventory/Inventory";

// components/Characters/Details/EquipmentInventorySection.tsx
interface EquipmentInventorySectionProps {
  characterId: number;
  equipmentSlots: any[];
  inventoryItems: any[];
  characterName: string; // Nueva prop
  characterSprite: string; // Nueva prop
}

const EquipmentInventorySection = ({
  characterId,
  equipmentSlots,
  inventoryItems,
  characterName,
  characterSprite,
}: EquipmentInventorySectionProps) => {
  return (
    <div className="w-full">
      <EquipmentPageClient
        characterId={characterId}
        equipmentSlots={equipmentSlots}
        characterName={characterName} // Pasar nueva prop
        characterSprite={characterSprite} // Pasar nueva prop
      />
      <h2 className="text-2xl font-semibold mt-8">Inventario</h2>
      <InventoryGrid
        characterId={characterId}
        inventoryItems={inventoryItems}
      />
    </div>
  );
};
export default EquipmentInventorySection;
