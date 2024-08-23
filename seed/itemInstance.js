
export async function seedItemInstances( prisma) {
  const itemTemplateIds = [5001, 5002, 5003]; // IDs de las plantillas de ítems que deseas usar
  const characterId = 1; // ID del personaje al que se asignarán las instancias
  const startId = 1000; // ID inicial
  const numberOfInstances = 5; // Número de instancias por cada plantilla de ítem
  try {
    let currentId = startId;

    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      throw new Error(`Character with id ${characterId} does not exist`);
    }

    const itemInstances = [];
    for (const itemTemplateId of itemTemplateIds) {
      for (let i = 0; i < numberOfInstances; i++) {
        if (currentId >= 5000) {
          throw new Error("ID fuera del rango permitido (1000-4999)");
        }

        const itemTemplate = await prisma.itemTemplate.findUnique({
          where: { id: itemTemplateId },
        });

        if (!itemTemplate) {
          console.warn(`ItemTemplate with id ${itemTemplateId} does not exist`);
          continue;
        }

        const itemInstance = await prisma.itemInstance.create({
          data: {
            id: currentId++, // Asignar manualmente el ID
            itemTemplateId: itemTemplateId,
            characterId: characterId,
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
    await prisma.$disconnect();
    return itemInstances;
  } catch (error) {
    console.error("Error al crear instancias de ítem:", error);
    throw error;
  } 
}
