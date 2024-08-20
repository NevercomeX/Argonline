import {templates} from "./data/items/itemTemplates.js";

export async function createItemTemplates(prisma) {
  try {
    const createdTemplates = await Promise.all(
      templates.map(async (template) => {
        return await prisma.itemTemplate.create({
          data: {
            name: template.name,
            itemType: template.itemType,
            description: template.description,
            baseAttack: template.baseAttack,
            baseDefense: template.baseDefense,
            baseHealth: template.baseHealth,
            baseMana: template.baseMana,
            rarity: template.rarity,
            equipable: template.equipable,
          },
        });
      })
    );

    createdTemplates.forEach(template => console.log(`Item Template ${template.name} creado. ✅` ));
    return createdTemplates;
  } catch (error) {
    console.error("Error al crear los ItemTemplates:", error);
    throw error;
  }
}