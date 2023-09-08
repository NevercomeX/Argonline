import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEquipment() {
  return await prisma.equipment.findMany();
}

export async function getEquipmentById(id) {
  return await prisma.equipment.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getEquipmentByCharacterIdAndSlot(characterId, slot) {
  const equipment = await prisma.equipment.findUnique({
    where: { characterId: parseInt(characterId) },
  });
  return equipment[slot];
}

export async function getEquipmentByCharacterId(characterId) {
  const equipment = await prisma.equipment.findMany({
    where: { characterId: parseInt(characterId) },
  });
  return equipment;
}
