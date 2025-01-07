import EquipmentPageClient from '../../../components/mainMenus/equipment/EquipmentMenu';
import InventoryGrid from '../../../components/mainMenus/inventory/Inventory';
import { getEquipmentSlotsByCharacterId } from '../../utils/gameUtils/equipmentApi';
import { getInventory } from '../../utils/gameUtils/inventoryApi';
import { getItemsById } from '../../utils/gameUtils/itemsApi';  // <-- Nueva función para obtener detalles del ítem o instancia

export default async function EquipmentAndInventoryPage({
  searchParams,
}: {
  searchParams: { characterId?: string };
}) {
  const characterId = parseInt(searchParams.characterId || '1', 10);

  // Obtener datos de equipo e inventario
  const equipmentSlotsData = await getEquipmentSlotsByCharacterId(characterId);
  const inventory = await getInventory(characterId);

  // Función para obtener detalles del ítem si solo tenemos el ID
  const getItemDetails = async (id: number | null) => {
    if (id === null) return null;  // Si no hay ID, devolvemos null
    const itemDetails = await getItemsById(id);  // <-- Llamada a tu API para obtener detalles
    return itemDetails;
  };

  // Formatear los datos del equipo
  const equipmentSlots = await Promise.all(
    Object.keys(equipmentSlotsData)
      .filter((slotName) => slotName !== 'id' && slotName !== 'characterId') // Excluir campos no relevantes
      .map(async (slotName) => {
        const slotData = equipmentSlotsData[slotName];  // Datos completos del slot

        // Si `slotData` es solo un ID, necesitamos obtener los detalles del ítem o instancia
        let itemInstance = null;
        let item = null;

        // Verificamos si es un ID y obtenemos los detalles
        if (typeof slotData === 'number') {
          const itemDetails = await getItemDetails(slotData); 
          item = itemDetails;
          itemInstance = itemDetails.itemTemplate ;
        } 

        const isInstance = !!itemInstance;  // Verifica si es instancia


        // Definir el ícono, dependiendo si es una instancia o ítem normal
        const itemIcon = isInstance
          ? itemInstance.itemIcon // Para ítems instanciados
          : item?.itemIcon; // Para ítems normales

        // Formatear los datos del slot para enviar al cliente
        return {
          slotName,
          displayName: slotName,
          itemId: itemInstance?.itemId || item?.itemId || null,  // Obtener el ID del ítem o instancia
          itemName: itemInstance?.name || item?.name || 'Vacío',  // Obtener el nombre del ítem
          isInstance,
          itemIcon: itemIcon,  // Icono del ítem
          templateId: isInstance ? itemInstance?.id : item?.id,  // ID del template si es una instancia
        };
      })
  );

  // Formatear los datos del inventario
  const inventoryItems = inventory.map((inventoryItem: any) => {
    const itemInstance = inventoryItem.itemInstance;  // Instancia de ítem, si existe
    const item = inventoryItem.item;  // Ítem normal, si existe

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
    <div className="flex min-h-screen p-4  text-white">
      {/* Equipamiento a la izquierda */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Equipamiento</h1>
        <EquipmentPageClient characterId={characterId} equipmentSlots={equipmentSlots} />
      </div>

      {/* Inventario a la derecha */}
      <div className="w-1/2 pl-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Inventario</h1>
        <InventoryGrid characterId={characterId} inventoryItems={inventoryItems} />
      </div>
    </div>
  );
}
