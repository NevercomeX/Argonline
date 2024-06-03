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

export async function equipItem(id, slot, itemId) {
  const equipment = await getEquipmentByCharacterIdAndSlot(id, slot);
  if (equipment) {
    const equipmentId = equipment.id;
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: { [slot]: parseInt(itemId) },
    });
  } else {
    throw new Error("Equipment not found");
  }
}

export async function deleteEquipmentById(id) {
  const equipment = await prisma.equipment.findFirst({
    where: { id: parseInt(id) },
  });
  if (equipment) {
    await prisma.equipment.delete({
      where: { id: parseInt(id) },
    });
  } else {
    throw new Error("Equipment not found");
  }
}
