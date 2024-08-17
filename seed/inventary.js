export async function inventarySeed(prisma) {
  const inventary = [
    {
      characterId: 1,
      itemId: 1,
      quantity: 1,
      location: "inventory",
    },
    {
      characterId: 1,
      itemId: 2,
      quantity: 10,
      location: "inventory",
    },
    {
      characterId: 1,
      itemId: 3,
      quantity: 1,
      location: "inventory",
    },
    {
      characterId: 1,
      itemId: 4,
      quantity: 1,
      location: "inventory",
    },
    {
      characterId: 1,
      itemId: 5,
      quantity: 1,
      location: "inventory",
    },
  ];

  for (const item of inventary) {
    const existingInventoryItem = await prisma.inventory.findFirst({
      where: {
        characterId: item.characterId,
        itemId: item.itemId,
      },
    });

    if (existingInventoryItem) {
      // Item already exists in inventory, so update the quantity
      await prisma.inventory.update({
        where: {
          id: existingInventoryItem.id,
        },
        data: {
          quantity: existingInventoryItem.quantity + item.quantity,
        },
      });
      console.log(`Item ${item.itemId} quantity updated.✅`);
    } else {
      // Item doesn't exist in inventory, so create it
      await prisma.inventory.create({
        data: item,
      });
      console.log(`Item ${item.itemId} created.✅`);
    }
  }
}
