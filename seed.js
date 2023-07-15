import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Datos de los enemigos
  const enemies = [
    {
      name: "Poring",
      health: 40,
      maxHealth: 40,
      attackPower: 10,
      magicPower: 0,
      defense: 2,
      magicDefense: 1,
      baseExpAmount: 10,
      jobExpAmount: 10,
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
      baseExpAmount: 15,
      jobExpAmount: 15,
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
      baseExpAmount: 20,
      jobExpAmount: 20,
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
      baseExpAmount: 25,
      jobExpAmount: 25,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
    },
    {
      name: "Condor",
      health: 80,
      maxHealth: 80,
      attackPower: 30,
      magicPower: 0,
      defense: 6,
      magicDefense: 1,
      baseExpAmount: 30,
      jobExpAmount: 30,
      baseLevel: 1,
      monsterType: "normal",
      attackType: "pyshical",
    },
  ];

  // Datos del jugador
  const player = {
    name: "Player",
    str: 7,
    agi: 2,
    vit: 4,
    int: 0,
    dex: 3,
    luk: 2,
    health: 1000,
    maxHealth: 1000,
    maxMana: 100,
    mana: 100,
    job: "Novice",
    baseLevel: 1,
    jobLevel: 1,
    baseExp: 0,
    jobExp: 0,
    maxBaseExp: 100,
    maxJobExp: 100,
    skillPoints: 0,
    attackType: "physical",
    attackPower: 100,
    magicPower: 100,
    defense: 50,
    magicDefense: 50,
  };

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
    }

    console.log(`Enemigo ${enemy.name} ya existe. Se omitió su creación ✅`);
  }

  // Crear jugador
  const existingPlayer = await prisma.player.findUnique({
    where: { name: player.name },
  });

  if (!existingPlayer) {
    await prisma.player.create({
      data: player,
    });

    console.log(`Jugador ${player.name} creado.✅ `);
  }

  console.log(`Jugador ${player.name} ya existe. Se omitió su creación ✅`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
