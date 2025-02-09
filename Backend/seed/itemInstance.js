// itemInstance.js

export async function itemInstanceSeed(prisma) {
  // Lista de instancias de ítems para agregar
  const itemInstances = [
    {
      itemId: 1, // ID del item base
      refineLevel: 3,
      durability: 95,
      enchantments: JSON.stringify({ str: 2, agi: 1 }), // Ejemplo de encantamientos
      cards: JSON.stringify([5, 7]), // IDs de cartas insertadas
    },
    {
      itemId: 2,
      refineLevel: 5,
      durability: 80,
      enchantments: JSON.stringify({ int: 3, vit: 2 }),
      cards: JSON.stringify([10]),
    },
    {
      itemId: 3,
      refineLevel: 0, // Sin refinamiento
      durability: 100, // Máxima durabilidad
      enchantments: null, // Sin encantamientos
      cards: null, // Sin cartas
    },
  ];

  for (const instance of itemInstances) {
    try {
      // Verificar si la instancia ya existe
      const existingInstance = await prisma.itemInstance.findFirst({
        where: {
          itemId: instance.itemId,
          refineLevel: instance.refineLevel,
        },
      });

      if (!existingInstance) {
        // Crear la instancia si no existe
        await prisma.itemInstance.create({
          data: instance,
        });
      } else {
        console.log(
          `ItemInstance for Item ID ${instance.itemId} (Refine +${instance.refineLevel}) already exists. ✅`
        );
      }
    } catch (error) {
      console.error(`Error creating ItemInstance for Item ID ${instance.itemId}:`, error);
    }
  }
}
