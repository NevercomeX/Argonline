export async function enemySeed(prisma) {
  const enemies = [
    {
      name: "Poring",
      health: 40,
      maxHealth: 40,
      attackPower: 10,
      magicPower: 0,
      defense: 2,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
    },
    {
      name: "Fabre",
      health: 50,
      maxHealth: 50,
      attackPower: 15,
      magicPower: 0,
      defense: 3,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
    },
    {
      name: "Lunatic",
      health: 60,
      maxHealth: 60,
      attackPower: 20,
      magicPower: 0,
      defense: 4,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
    },
    {
      name: "Pupa",
      health: 70,
      maxHealth: 70,
      attackPower: 25,
      magicPower: 0,
      defense: 5,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "magical",
    },
    {
      name: "Condor",
      health: 80,
      maxHealth: 80,
      attackPower: 30,
      magicPower: 0,
      defense: 6,
      magicDefense: 1,
      giveBaseExpAmount: 10,
      giveJobExpAmount: 10,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
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

      console.log(`Enemigo ${enemy.name} creado.✅`);
    } else {
      console.log(`Enemigo ${enemy.name} ya existe.✅`);
    }
  }
}
