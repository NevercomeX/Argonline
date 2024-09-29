import { getInventory } from '../../utils/inventoryApi';
import InventoryGrid from '../../../components/mainMenus/inventory/Inventory';

// Componente de servidor (Server Component)
export default async function InventoryPage({
  searchParams,
}: {
  searchParams: { characterId?: number };
}) {
  // Obtener el `characterId` de los parámetros o usar "1" por defecto
  const characterId = searchParams.characterId || 1;

  // Obtener los datos del inventario desde la API (SSR)
  const inventory = await getInventory(Number(characterId));

  // Formatear los datos para agregar la URL del ícono de cada ítem
  const inventoryItems = inventory.map((inventoryItem: any) => {
    const itemInstance = inventoryItem.itemInstance;
    const item = inventoryItem.item;

    return {
      id: inventoryItem.itemInstanceId || inventoryItem.itemId,
      name: itemInstance?.itemTemplate?.name || item?.name || 'Unknown Item',
      quantity: inventoryItem.quantity,
      equipable: itemInstance?.itemTemplate?.equipable || item?.equipable || false,
      equipmentSlot: itemInstance?.itemTemplate?.equipmentSlot || item?.equipmentSlot || 'Unknown Slot',
      isInstance: !!inventoryItem.itemInstanceId,
      iconUrl: itemInstance?.itemTemplate?.iconUrl || item?.iconUrl || '/default-icon.png', // Verificar que el ícono exista
    };
  });

  // Pasar los datos al componente cliente
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <InventoryGrid characterId={characterId} inventoryItems={inventoryItems} />
    </div>
  );
}
