import { getEquipmentSlotsByCharacterId, getItemNameById } from '../../utils/equipmentApi';
import EquipmentPageClient from '../../../components/mainMenus/equipment/EquipmentMenu';

// Leer la variable de entorno para el modo debug
const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';  // Si la variable es 'true', está activado

export default async function EquipmentPage({ searchParams }: { searchParams: { characterId?: string } }) {
  // Convertir `characterId` a un número, ya que Prisma espera un Int
  const characterId = DEBUG_MODE ? 1 : parseInt(searchParams.characterId || '1', 10);  // Convertimos a número

  // Obtener datos de slots de equipo desde el backend
  const equipmentSlotsData = await getEquipmentSlotsByCharacterId(characterId);

  // Obtener nombres de los ítems, ignorando slots con `null` (vacíos) y excluyendo campos como `id` y `characterId`
  const itemIds = Object.keys(equipmentSlotsData)
    .filter((slotName) => equipmentSlotsData[slotName] !== null && slotName !== 'id' && slotName !== 'characterId')
    .map((slotName) => equipmentSlotsData[slotName]);

  const itemNamesMap = await Promise.all(
    itemIds.map(async (itemId) => ({
      itemId,
      itemName: await getItemNameById(itemId),
    }))
  );

  // Crear un array de objetos para cada slot, asegurándose de excluir `id` y `characterId`
  const equipmentSlots = Object.keys(equipmentSlotsData)
    .filter((slotName) => slotName !== 'id' && slotName !== 'characterId') // Excluir campos no equipables
    .map((slotName) => {
      const displayName = slotName;  // Puedes hacer un mapeo si tienes nombres personalizados
      const itemId = equipmentSlotsData[slotName];
      const itemName = itemId === null ? 'Vacío' : itemNamesMap.find((item) => item.itemId === itemId)?.itemName || 'Unknown Item';

      return {
        slotName,
        displayName,
        itemId,
        itemName,
      };
    });

  return (
    <div>
      <EquipmentPageClient characterId={characterId} equipmentSlots={equipmentSlots} />
    </div>
  );
}
