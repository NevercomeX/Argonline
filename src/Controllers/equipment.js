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
  /**
   * Retrieves equipment data based on the character ID and equipment slot.
   *
   * @param {number} characterId - The ID of the character.
   * @param {string} slot - The equipment slot to retrieve data for.
   * @returns {object} - The equipment data for the specified character ID and slot.
   *
   * @example
   * const characterId = 1;
   * const slot = "head";
   * const equipment = await getEquipmentByCharacterIdAndSlot(characterId, slot);
   * console.log(equipment);
   * // Output: { id: 1, characterId: 1, head: 1234, chest: null, legs: 5678 }
   */
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

/**
 * Updates the equipment of a character in a game.
 * @param {number} id - The ID of the character.
 * @param {string} slot - The slot where the equipment should be updated.
 * @param {number} itemId - The ID of the item to be equipped.
 * @returns {Promise<object>} - A promise that resolves with the updated equipment data.
 */
export async function equipItem(id, slot, itemId) {
  if (
    typeof id !== "number" ||
    typeof slot !== "string" ||
    typeof itemId !== "number"
  ) {
    throw new Error("Invalid input parameters");
  }

  try {
    const equipment = await getEquipmentByCharacterIdAndSlot(id, slot);
    if (equipment) {
      const equipmentId = equipment.id;

      const updatedEquipment = await prisma.equipment.update({
        where: { id: equipmentId },
        data: { [slot]: parseInt(itemId) },
      });

      await prisma.$disconnect();

      return updatedEquipment;
    } else {
      console.error(
        `No equipment found for character ID ${id} and slot ${slot}`
      );
    }
  } catch (error) {
    throw error;
  }
}
