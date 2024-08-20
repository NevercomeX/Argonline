export async function inventarySeed(prisma) {
  // Función para quitar espacios del nombre
  function removeSpaces(name) {
    return name.replace(/\s+/g, '');
  }

  // Obtener los ítems de la base de datos, quitando espacios en los nombres
  const itemNames = [
    "Health Potion",
    "Mana Potion",
    "Stamina Elixir",
    "Iron Sword",
    "Steel Axe",
    "Iron Helmet"
  ];

  const items = await prisma.item.findMany({
    where: {
      name: {
        in: itemNames.map(name => removeSpaces(name)),
      },
    },
  });

  // Datos del inventario para un personaje
  const characterId = 1;
  const inventoryData = [
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Health Potion')).id, quantity: 4 },
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Mana Potion')).id, quantity: 7 },
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Stamina Elixir')).id, quantity: 1 },
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Iron Sword')).id, quantity: 1 },
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Steel Axe')).id, quantity: 1 },
    { characterId, itemId: items.find(item => removeSpaces(item.name) === removeSpaces('Iron Helmet')).id, quantity: 1 },
  ];

  // Poblar la tabla Inventory
  for (const inv of inventoryData) {
    await prisma.inventory.create({
      data: {
        characterId: inv.characterId,
        itemId: inv.itemId,
        quantity: inv.quantity,
      },
    });
  }

  console.log('Inventory seeding completed successfully!');
  await prisma.$disconnect();
}
