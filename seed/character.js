export async function characterSeed(prisma) {
  const character = {
    name: "Fulanito",
    userId: 1,
    jobclassId: 1,
    str: 1,
    agi: 1,
    vit: 1,
    int: 1,
    dex: 1,
    luk: 1,
    baseLevel: 1,
    jobLevel: 1,
    baseExp: 0,
    jobExp: 0,
    maxBaseExp: 500,
    maxJobExp: 100,
    skillPoints: 0,
    health: 100,
    maxHealth: 100,
    maxMana: 10,
    mana: 10,
    attackPower: 10,
    magicPower: 0,
    defense: 2,
    magicDefense: 1,
  };

  // Crear jugador
  const existingPlayer = await prisma.character.findUnique({
    where: { name: character.name },
  });

  if (!existingPlayer) {
    await prisma.character.create({
      data: character,
    });

    console.log(`Jugador ${character.name} creado.✅`);
  } else {
    console.log(`Jugador ${character.name} ya existe. ✅`);
  }
}
