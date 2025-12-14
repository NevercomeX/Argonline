// storageSeed.js

import { prisma } from "../src/prismaClient/prismaClient";
export async function storageSeed() {
  // Get all users from the database
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  });

  if (users.length === 0) {
    console.error("No users found! Make sure userSeed has run successfully.");
    return;
  }

  console.log(`Found ${users.length} users for storage seeding`);
  const userIds = users.map(u => u.id);

  // Lista de nombres de ítems base para buscar en la tabla Item
  const itemNames = [
    "Health Potion",
    "Mana Potion",
  ];

  // Buscar los ítems base en la tabla Item
  const items = await prisma.item.findMany({
    where: {
      name: { in: itemNames },
    },
  });

  // Verificar si todos los ítems fueron encontrados
  const missingItems = itemNames.filter(
    (name) => !items.find((item) => item.name === name)
  );
  if (missingItems.length > 0) {
    console.error(
      `Los siguientes ítems no se encontraron en la base de datos: ${missingItems.join(", ")}`
    );
    return;
  }

  // Definir la cantidad total de cada ítem en el almacenamiento general
  const generalStorageData = [
    {
      itemId: items.find((item) => item.name === "Health Potion")!.id,
      quantity: 10,
    },
    {
      itemId: items.find((item) => item.name === "Mana Potion")!.id,
      quantity: 15,
    },
  ];

  // Distribuir el almacenamiento general entre los usuarios de forma equitativa
  const distributedStorageData = userIds
    .map((userId) =>
      generalStorageData.map((item) => ({
        userId,
        itemId: item.itemId,
        quantity: Math.floor(item.quantity / userIds.length),
      }))
    )
    .flat();

  // Poblar la tabla StorageItem (almacenamiento de usuarios)
  for (const storage of distributedStorageData) {
    await prisma.storageItem.create({
      data: {
        userId: storage.userId,
        itemId: storage.itemId,
        quantity: storage.quantity,
        // Se pueden agregar valores por defecto para refineLevel o cards si es necesario
      },
    });
  }
}