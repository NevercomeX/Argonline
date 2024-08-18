//seed equipment


export async function equipmentSeed(prisma) {
  const equipment = [
    {
      characterId: 1,
      upperHeadSlot: null,
      midHeadSlot: null,
      lowerHeadSlot: null,
      bodySlot: null,
      rightHandSlot: null,
      leftHandSlot: null,
      robeSlot: null,
      shoesSlot: null,
      accessorySlot01: null,
      accessorySlot02: null,
      ammoSlot: null,
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
