// monsterSeed.js

/**
 * Siembra algunos monstruos básicos en la base de datos.
 * Asegúrate de que este seeder se ejecute ANTES que los spawns y drops, 
 * ya que ellos dependen de los monsters.
 */
export async function monsterSeed(prisma) {
  const monstersData = [
    {
      name: 'Poring',
      level: 1,
      health: 50,
      mana: 10,
      baseExp: 10,
      jobExp: 5,
      attack: 1,
      magicAttack: 1,
      defense: 1,
      magicDefense: 1,
      attackSpeed: 1,
      moveSpeed: 1,
      attackRange: 1,
      element: 'NEUTRAL', // Se puede enviar como string, Prisma lo convierte al enum correspondiente
      size: 'Small',
      race: 'Slime',
      sprite: 'poring.png'
    },
    {
      name: 'Lunatic',
      level: 10,
      health: 500,
      mana: 100,
      baseExp: 100,
      jobExp: 100,
      attack: 20,
      magicAttack: 10,
      defense: 15,
      magicDefense: 10,
      attackSpeed: 2,
      moveSpeed: 2,
      attackRange: 1,
      element: 'WIND',
      size: 'Medium',
      race: 'Undead',
      sprite: 'lunatic.png'
    }
  ];

  for (const monsterData of monstersData) {
    await prisma.monster.create({
      data: monsterData,
    });
  }
}
