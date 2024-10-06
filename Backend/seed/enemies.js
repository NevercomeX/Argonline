export async function enemySeed(prisma) {
  const enemies = [
    {
      name: "Poring",
      health: 40,
      maxHealth: 40,
      attackPower: 5,
      magicPower: 0,
      defense: 2,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "Animal",
      attackType: "pyshical",
      mobIcon: "poring.gif",
    },
    {
      name: "Fabre",
      health: 50,
      maxHealth: 50,
      attackPower: 5,
      magicPower: 0,
      defense: 3,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
      mobIcon: "fabre.gif",
    },
    {
      name: "Lunatic",
      health: 60,
      maxHealth: 60,
      attackPower: 5,
      magicPower: 0,
      defense: 4,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
      mobIcon: "lunatic.gif",
    },
    {
      name: "Pupa",
      health: 70,
      maxHealth: 70,
      attackPower: 5,
      magicPower: 0,
      defense: 5,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "magical",
      mobIcon: "pupa.gif",
    },
    {
      name: "Condor",
      health: 80,
      maxHealth: 80,
      attackPower: 5,
      magicPower: 0,
      defense: 6,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
      mobIcon: "condor.gif",
    },
    
  ];

  // Crear enemigos
  for (let enemy of enemies) {
    const existingEnemy = await prisma.enemy.findUnique({
      where: { name: enemy.name },
    });

    if (!existingEnemy) {
      await prisma.enemy.create({
        data: enemy,
      });


    } else {
      console.log(`Enemy ${enemy.name} already exist.`);
    }
  }

  await prisma.$disconnect();
}
