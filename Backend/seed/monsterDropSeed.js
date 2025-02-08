// monsterDropSeed.js

export async function monsterDropSeed(prisma) {
  // Buscar monstruos y objetos en la base de datos
  const monsters = await prisma.monster.findMany();
  const items = await prisma.item.findMany();

  if (monsters.length === 0 || items.length === 0) {
    console.error("No hay monstruos o ítems en la base de datos. Asegúrate de correr primero los seeders de Monster e Item.");
    return;
  }

  // Definir drops por monstruo
  const drops = [
    { monsterName: "Poring", itemName: "Health Potion"},
    { monsterName: "Poring", itemName: "Mana Potion"},
    { monsterName: "Lunatic", itemName: "Iron Sword"},
    { monsterName: "Fabre", itemName: "Stamina Elixir"},
    { monsterName: "Savage", itemName: "Steel Axe"},
    { monsterName: "Savage", itemName: "Iron Helmet"},
  ];

  // Insertar drops en la base de datos
  for (const drop of drops) {
    const monster = monsters.find((m) => m.name === drop.monsterName);
    const item = items.find((i) => i.name === drop.itemName);

    if (!monster || !item) {
      console.error(`No se encontró el monstruo ${drop.monsterName} o el ítem ${drop.itemName}.`);
      continue;
    }

    await prisma.monsterDrop.create({
      data: {
        monsterId: monster.id,
        itemId: item.id,
        dropRate: drop.dropRate,
      },
    });
  }
}