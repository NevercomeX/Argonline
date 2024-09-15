export async function enemyDropSeed(prisma) {
  const enemyDrop = [
    {
      enemyId: 1,
      itemId: 1,
      dropChance: 100,
    },
    {
      enemyId: 2,
      itemId: 2,
      dropChance: 100,
    },
    {
      enemyId: 3,
      itemId: 1,
      dropChance: 100,
    },
    {
      enemyId: 4,
      itemId: 2,
      dropChance: 100,
    },
    {
      enemyId: 5,
      itemId: 3,
      dropChance: 100,
    },
  ];

  for (let drop of enemyDrop) {
    const existingDrop = await prisma.enemyDrop.findUnique({
      where: { enemyId_itemId: { enemyId: drop.enemyId, itemId: drop.itemId } },
    });

    if (!existingDrop) {
      await prisma.enemyDrop.create({
        data: drop,
      });

    } else {
      console.log(`Drop ${drop.enemyId} ya existe.`);
    }
  }
  await prisma.$disconnect();
}
