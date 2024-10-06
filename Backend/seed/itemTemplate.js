import { templates } from "./data/items/itemTemplates.js";

export async function createItemTemplates(prisma) {
  try {
    const createdTemplates = await Promise.all(
      templates.map(async (template) => {
        return await prisma.itemTemplate.create({
          data: {
            id: template.id,
            name: template.name,
            itemType: template.itemType,
            itemSubType: template.itemSubType,
            equipmentSlot: template.equipmentSlot,
            description: template.description,
            price: template.price,
            attackPower: template.attackPower,
            magicPower: template.magicPower,
            defense: template.defense,
            magicDefense: template.magicDefense,
            health: template.health,
            mana: template.mana,
            str: template.str,
            agi: template.agi,
            vit: template.vit,
            int: template.int,
            dex: template.dex,
            luk: template.luk,
            slot: template.slot,
            weaponType: template.weaponType,
            usable: template.usable,
            baseMana: template.baseMana,
            rarity: template.rarity,
            equipable: template.equipable,
            itemIcon: template.itemIcon,
          },
        });
      })
    );

    await prisma.$disconnect();
    return createdTemplates;

  } catch (error) {
    console.error("Error al crear los ItemTemplates:", error);
    throw error;
  }
}