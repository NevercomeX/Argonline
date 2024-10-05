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

      // Obtén el nombre real desde tu lógica, por ejemplo, desde `getItemNameById` si es necesario
      const itemName = itemId ? 'Some Item Name' : 'Vacío';  

      // Aquí deberías implementar tu lógica para manejar ítems instanciados
      return {
        slotName,
        displayName: slotName,  // Puedes personalizar estos nombres según la ranura de equipo
        itemId,
        itemName,
        isInstance: false,  // Modifica esto si manejas instancias en el equipo
        itemIcon: '',  // Actualiza con la lógica real para obtener el ícono
        templateId: null,  // Si es instancia, puedes asignar el `templateId`
      };
    });

  // Procesar los datos del inventario
  const inventoryItems = inventory.map((inventoryItem: any) => {
    const itemInstance = inventoryItem.itemInstance;  // Instancia de ítem, si existe
    const item = inventoryItem.item;  // Ítem normal, si existe

    // Formateamos los datos para manejar tanto ítems normales como instancias
    return {
      id: inventoryItem.itemInstanceId || inventoryItem.itemId,  // ID del ítem o de la instancia
      templateId: itemInstance?.itemTemplate?.id || item?.id,    // ID del template si es instancia
      name: itemInstance?.itemTemplate?.name || item?.name || 'Unknown Item',
      quantity: inventoryItem.quantity,
      equipable: itemInstance?.itemTemplate?.equipable || item?.equipable || false,
      equipmentSlot: itemInstance?.itemTemplate?.equipmentSlot || item?.equipmentSlot || 'Unknown Slot',
      isInstance: !!inventoryItem.itemInstanceId,  // Si es una instancia de un ítem
      itemIcon: itemInstance?.itemTemplate?.itemIcon || item?.itemIcon,  // Icono del ítem o de la instancia
    };
  });

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
