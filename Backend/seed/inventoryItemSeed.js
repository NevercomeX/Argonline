// inventorySeed.js

export async function inventorySeed(prisma) {
  // Lista de IDs de los personajes para poblar su inventario
  const characterIds = [1, 2]; // Agrega aquí los IDs de los personajes que existan

  // Lista de nombres de ítems base para buscar en la tabla Item
  const itemNames = [
    "Health Potion",
    "Mana Potion",
    "Stamina Elixir",
    "Assassin's Shroud",
    "Swordsman's Plate",
    "Swordsman's Ironclad Striders",
    "Assassin's Silent Treads"
  ];

  // Buscar los ítems base en la tabla Item
  const items = await prisma.item.findMany({
    where: {
      name: { in: itemNames },
    },
  });

  // Verifica si todos los ítems fueron encontrados
  const missingItems = itemNames.filter(
    (name) => !items.find((item) => item.name === name)
  );
  if (missingItems.length > 0) {
    console.error(
      `Los siguientes ítems no se encontraron en la base de datos: ${missingItems.join(", ")}`
    );
    return;
  }

  // Crear datos de inventario para cada personaje
  const characterInventoryData = characterIds
    .map((characterId) => [
      {
        characterId,
        itemId: items.find((item) => item.name === "Health Potion").id,
        quantity: 4,
      },
      {
        characterId,
        itemId: items.find((item) => item.name === "Mana Potion").id,
        quantity: 7,
      },
      {
        characterId,
        itemId: items.find((item) => item.name === "Stamina Elixir").id,
        quantity: 1,
      },
            {
        characterId,
        itemId: items.find((item) => item.name === "Assassin's Shroud").id,
        quantity: 1,
      },
                  {
        characterId,
        itemId: items.find((item) => item.name === "Swordsman's Plate").id,
        quantity: 1,
      },
                        {
        characterId,
        itemId: items.find((item) => item.name === "Swordsman's Ironclad Striders").id,
        quantity: 1,
      },
                              {
        characterId,
        itemId: items.find((item) => item.name === "Assassin's Silent Treads").id,
        quantity: 1,
      },
    ])
    .flat();

  // Poblar la tabla InventoryItem (inventario de personajes)
  for (const inv of characterInventoryData) {
    await prisma.inventoryItem.create({
      data: {
        characterId: inv.characterId,
        itemId: inv.itemId,
        quantity: inv.quantity,
        // Los demás campos se llenarán con sus valores por defecto (p.ej.: isEquipped, refineLevel, etc.)
      },
    });
  }
}
