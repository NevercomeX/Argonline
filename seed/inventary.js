export async function inventarySeed(prisma) {
  // Lista de nombres de ítems base para buscar en la tabla Item
  const itemNames = [
    "Health Potion",
    "Mana Potion",
    "Stamina Elixir",
    "Iron Sword",
    "Steel Axe",
    "Iron Helmet",
  ];


  // Buscar los ítems base en la tabla Item
  const items = await prisma.item.findMany({
    where: {
      name: {
        in: itemNames,
      },
    },
  });


  // Verifica si todos los ítems fueron encontrados
  const missingItems = itemNames.filter(name => !items.find(item => item.name === name));
  if (missingItems.length > 0) {
    console.error(`Los siguientes ítems no se encontraron en la base de datos: ${missingItems.join(', ')}`);
    return;
  }

  // Datos del inventario para un personaje
  const characterId = 1;
  const inventoryData = [
    { characterId, itemId: items.find(item => item.name === 'Health Potion').id, quantity: 4 },
    { characterId, itemId: items.find(item => item.name === 'Mana Potion').id, quantity: 7 },
    { characterId, itemId: items.find(item => item.name === 'Stamina Elixir').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Iron Sword').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Steel Axe').id, quantity: 1 },
    { characterId, itemId: items.find(item => item.name === 'Iron Helmet').id, quantity: 1 },
  ];

  // Lista de nombres de ítems que requieren instancias
  const itemTemplateNames = [
    "Longsword",
    "Magic Staff",
    "Crossbow"
  ];

  // Buscar ítems templates
  const itemTemplates = await prisma.itemTemplate.findMany({
    where: {
      name: {
        in: itemTemplateNames,
      },
    },
  });

  // Crear instancias de ítems y añadirlas al inventario
  for (const template of itemTemplates) {
    const baseItem = itemTemplates.find(item => item.name === template.name);
    console.log(baseItem)
    if (baseItem) {
      const newItemInstance = await prisma.itemInstance.create({
        data: {
          itemTemplateId: template.id,
          characterId: characterId,
          currentAttack: template.baseAttack,  // Usar valores del template o personalizarlos
          currentDefense: template.baseDefense,
          currentHealth: template.baseHealth,
          currentMana: template.baseMana,
          upgradeLevel: 0,
          socketedGems: null,
          enchantments: null,
        },
        
      }

    );

      // Añadir el ítem instanciado al inventario
      inventoryData.push({
        characterId,
        quantity: 1,
        itemInstanceId: newItemInstance.id, // Asocia la instancia creada
      });
      console.log(newItemInstance)
    } else {
      console.error(`El ítem base para '${template.name}' no se encontró en la lista de ítems.`);
    }
  }

  // Poblar la tabla Inventory
  for (const inv of inventoryData) {
    await prisma.inventory.create({
      data: {
        characterId: inv.characterId,
        itemId: inv.itemId,
        quantity: inv.quantity,
        itemInstanceId: inv.itemInstanceId || null, // Agregar itemInstanceId si está presente
      },
    });
  }

  console.log('Inventory seeding completed successfully!');
  await prisma.$disconnect();
}
