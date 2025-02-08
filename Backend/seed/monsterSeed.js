// monsterSeed.js

export async function monsterSeed(prisma) {
  // Definición de monstruos
  const monsters = [
    {
      name: "Poring",
      level: 1,
      element: "WATER", // Enum ElementType
    },
    {
      name: "Lunatic",
      level: 2,
      element: "EARTH",
    },
    {
      name: "Fabre",
      level: 3,
      element: "EARTH",
    },
    {
      name: "Savage",
      level: 10,
      element: "NEUTRAL",
    },
  ];

  // Insertar monstruos en la base de datos
  for (const monster of monsters) {
    const existingMonster = await prisma.monster.findUnique({
      where: { name: monster.name },
    });

    if (!existingMonster) {
      await prisma.monster.create({ data: monster });
    } else {
      console.log(`El monstruo ${monster.name} ya existe.`);
    }
  }
}
