import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEquipment() {
  return await prisma.equipment.findMany();
}

export async function getEquipmentById(id) {
  return await prisma.equipment.findFirst({
    where: { id: parseInt(id) },
  });
}

export async function getEquipmentByCharacterIdAndSlot(characterId, slot) {
  const equipment = await prisma.equipment.findFirst({
    where: {
      characterId: parseInt(characterId),
      [slot]: { not: null },
    },
  });
  return equipment;
}

export async function getEquipmentByCharacterId(characterId) {
  const equipment = await prisma.equipment.findMany({
    where: { characterId: parseInt(characterId) },
  });
  return equipment;
}

export async function unequipItem(id, slot) {
  const equipment = await getEquipmentByCharacterIdAndSlot(id, slot);
  const equipmentId = equipment.id;
  await prisma.equipment.update({
    where: { id: equipmentId },
    data: { [slot]: null },
  });
}
