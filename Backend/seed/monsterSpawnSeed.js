export async function monsterSpawnSeed(prisma) {
  // Buscar monstruos existentes
  const monsters = await prisma.monster.findMany();

  if (monsters.length === 0) {
    console.error("No hay monstruos en la base de datos. Asegúrate de correr primero el seeder de Monster.");
    return;
  }

  // Definir ubicaciones de spawn
  const spawnPoints = [
    { monsterName: "Poring", mapName: "Prontera Field", amount: 10, respawnTime: 30, x: 10, y: 20 },
    { monsterName: "Lunatic", mapName: "Prontera Field", amount: 8, respawnTime: 35, x: 15, y: 25 },
    { monsterName: "Fabre", mapName: "Geffen Field", amount: 12, respawnTime: 25, x: 5, y: 10 },
    { monsterName: "Savage", mapName: "Payon Forest", amount: 5, respawnTime: 60, x: 30, y: 40 },
  ];

  // Insertar spawns en la base de datos
  for (const spawn of spawnPoints) {
    const monster = monsters.find((m) => m.name === spawn.monsterName);

    if (!monster) {
      console.error(`No se encontró el monstruo ${spawn.monsterName} en la base de datos.`);
      continue;
    }

    await prisma.monsterSpawn.create({
      data: {
        monsterId: monster.id,
        map: spawn.mapName,
        amount: spawn.amount,
        respawnTime: spawn.respawnTime,
        x: spawn.x,
        y: spawn.y,
      },
    });

    console.log(`Spawn de ${spawn.monsterName} agregado en ${spawn.mapName} con ${spawn.amount} unidades.`);
  }
}
