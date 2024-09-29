import EquipmentPageClient from '../../../components/mainMenus/equipment/EquipmentMenu';
import InventoryGrid from '../../../components/mainMenus/inventory/Inventory';
import { getEquipmentSlotsByCharacterId } from '../../utils/equipmentApi';
import { getInventory } from '../../utils/inventoryApi';

export default async function EquipmentAndInventoryPage({
  searchParams,
}: {
  searchParams: { characterId?: string };
}) {
  const characterId = parseInt(searchParams.characterId || '1', 10);

  // Obtener datos de equipo e inventario
  const equipmentSlotsData = await getEquipmentSlotsByCharacterId(characterId);
  const inventory = await getInventory(characterId);

  // Formatear los datos del equipo e inventario
  const equipmentSlots = Object.keys(equipmentSlotsData)
    .filter((slotName) => slotName !== 'id' && slotName !== 'characterId')
    .map((slotName) => {
      const itemId = equipmentSlotsData[slotName];
      const itemName = itemId ? 'Some Item Name' : 'Vacío';  // Obtén el nombre real desde tu lógica
      return {
        slotName,
        displayName: slotName,
        itemId,
        itemName,
      };
    });

  const inventoryItems = inventory.map((inventoryItem: any) => ({
    id: inventoryItem.itemInstanceId || inventoryItem.itemId,
    name: inventoryItem.itemInstance?.itemTemplate?.name || inventoryItem.item?.name || 'Unknown Item',
    quantity: inventoryItem.quantity,
    equipable: inventoryItem.itemInstance?.itemTemplate?.equipable || inventoryItem.item?.equipable || false,
    equipmentSlot: inventoryItem.itemInstance?.itemTemplate?.equipmentSlot || inventoryItem.item?.equipmentSlot || 'Unknown Slot',
    isInstance: !!inventoryItem.itemInstanceId,
    iconUrl: inventoryItem.itemInstance?.itemTemplate?.iconUrl || inventoryItem.item?.iconUrl || '/default-icon.png',
  }));

  return (
    <div className="flex min-h-screen p-4 bg-gray-800 text-white">
      {/* Equipamiento a la izquierda */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Equipamiento</h1>
        {/* Pasamos los datos como props a los componentes de cliente */}
        <EquipmentPageClient characterId={characterId} equipmentSlots={equipmentSlots} />
      </div>

      {/* Inventario a la derecha */}
      <div className="w-1/2 pl-4">
        <h1 className="text-2xl font-bold mb-4">Inventario</h1>
        <InventoryGrid characterId={characterId} inventoryItems={inventoryItems} />
      </div>
    </div>
  );
}
