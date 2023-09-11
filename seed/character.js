// model User {
//   id       Int      @id @default(autoincrement())
//   userId      Int?
//   username String   @unique
//   email    String   @unique
//   password String
//   role     String   @default("user")
//   Character Character[]
// }

// model Character {
//   id            Int    @id @default(autoincrement())
//   Name          String @unique
//   userId        Int
//   str           Int
//   agi           Int
//   vit           Int
//   int           Int
//   dex           Int
//   luk           Int
//   jobclass    jobClass[]
//   baseLevel     Int
//   jobLevel      Int
//   baseExp       Int
//   jobExp        Int
//   maxBaseExp    Int
//   maxJobExp     Int
//   skillPoints   Int
//   health        Int
//   maxHealth     Int
//   maxMana       Int
//   mana          Int
//   attackPower   Int
//   magicPower    Int
//   defense       Int
//   magicDefense  Int
//   Inventarty   Inventory[]
//   Equipment    Equipment[]
//   User          User   @relation(fields: [userId], references: [id])
// }

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
    maxBaseExp: 10,
    maxJobExp: 10,
    skillPoints: 0,
    health: 40,
    maxHealth: 40,
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
