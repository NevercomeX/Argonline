//seed equipment

import { PrismaClient } from "@prisma/client/edge.js";

const prisma = new PrismaClient();

export async function equipmentSeed(prisma) {
  const equipment = [
    {
      characterId: 1,
      upperHeadSlot: 6,
      midHeadSlot: 7,
      lowerHeadSlot: 8,
      bodySlot: 10,
      rightHandSlot: 15,
      leftHandSlot: 9,
      robeSlot: 7,
      shoesSlot: 11,
      accessorySlot01: 12,
      accessorySlot02: 13,
      ammoSlot: 27,
    },
  ];

  for (const item of equipment) {
    const existingEquipment = await prisma.equipment.findFirst({
      where: {
        characterId: item.characterId,
      },
    });

    if (existingEquipment) {
      // Item already exists in equipment, so update the quantity
      await prisma.equipment.update({
        where: {
          id: existingEquipment.id,
        },
        data: {
          headgearSlot: item.headgearSlot,
          armorSlot: item.armorSlot,
          weaponSlot: item.weaponSlot,
          shieldSlot: item.shieldSlot,
          garmentSlot: item.garmentSlot,
          footwearSlot: item.footwearSlot,
          accessorySlot01: item.accessorySlot01,
          accessorySlot02: item.accessorySlot02,
        },
      });
      console.log(`Equipment ${item.characterId} updated.✅`);
    } else {
      // Item doesn't exist in equipment, so create it
      await prisma.equipment.create({
        data: item,
      });
      console.log(`Equipment ${item.characterId} created.✅`);
    }
  }
}
