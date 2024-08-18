// itemInstance.js
export async function createItemInstances(prisma, itemTemplateIds, characterId) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new Error(`Character with id ${characterId} does not exist`);
    }

    const itemInstances = [];
    for (const itemTemplateId of itemTemplateIds) {
      const itemTemplate = await prisma.itemTemplate.findUnique({
        where: { id: itemTemplateId },
      });

      if (!itemTemplate) {
        console.warn(`ItemTemplate with id ${itemTemplateId} does not exist`);
        continue;
      }

      // Solo crear una instancia si el ítem es equipable o tiene atributos únicos
      if (itemTemplate.itemType === "Weapon" || itemTemplate.itemType === "Armor") {
        const itemInstance = await prisma.itemInstance.create({
          data: {
            itemTemplateId,
            characterId,
            currentAttack: itemTemplate.baseAttack,
            currentDefense: itemTemplate.baseDefense,
            currentHealth: itemTemplate.baseHealth,
            currentMana: itemTemplate.baseMana,
            upgradeLevel: 0,
            socketedGems: null,
            enchantments: null,
          },
        });

        itemInstances.push(itemInstance);
      }
    }

    return itemInstances;
  } catch (error) {
    console.error("Error al crear instancias de ítem:", error);
    throw error;
  }
}
