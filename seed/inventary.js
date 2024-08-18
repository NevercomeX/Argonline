export async function inventarySeed(prisma) {
  // Obtener los ítems de la base de datos
  const items = await prisma.item.findMany({
    where: {
      name: {
        in: ["Apple", "Orange", "Banana", "Peach", "Pear", "Sword"], // Lista de nombres de ítems que quieres agregar al inventario
      },
    },
  });

  // Datos del inventario para un personaje
  const characterId = 1;
  const inventoryData = [
    { characterId, itemId: items.find(item => item.name === 'Apple').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Orange').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Banana').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Peach').id, quantity: 5 },
    { characterId, itemId: items.find(item => item.name === 'Pear').id, quantity: 3 },
    { characterId, itemId: items.find(item => item.name === 'Sword').id, quantity: 1 },
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
