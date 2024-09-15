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
    "Helmet of Valor",
    "Mask of Mystics",
    "Bandana of Stealth",
    "Knight's Armor",
    "Sword of Flames",
    "Axe of Thunder",
    "Shield of Fortitude",
    "Cloak of Shadows",
    "Boots of Swiftness",
    "Ring of Fortune",
    "Amulet of Protection",

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
  let currentId = 10000; // ID inicial para ItemInstance

  for (const template of itemTemplates) {
    if (currentId > 15000) {
      console.error("El ID ha superado el rango permitido (10000-15000)");
      break;
    }

    const newItemInstance = await prisma.itemInstance.create({
      data: {
        id: currentId++,  // Asignar manualmente el ID
        itemTemplateId: template.id,
        characterId: characterId,
        currentAttack: template.attackPower,
        currentDefense: template.defense,
        currentHealth: template.health,
        currentMana: template.mana,
        upgradeLevel: 0,
        socketedGems: null,
        enchantments: null,
        
      },
    });

    // Añadir el ítem instanciado al inventario
    inventoryData.push({
      characterId,
      quantity: 1,
      itemInstanceId: newItemInstance.id, // Asocia la instancia creada
    });
  }

  // Poblar la tabla Inventory
  for (const inv of inventoryData) {
    await prisma.inventory.create({
      data: {
        characterId: inv.characterId,
        itemId: inv.itemId || null, // Agregar itemId si está presente
        quantity: inv.quantity,
        itemInstanceId: inv.itemInstanceId || null, // Agregar itemInstanceId si está presente
      },
    });
  }
  await prisma.$disconnect();
}

