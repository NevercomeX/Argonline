// inventorySeed.js

import { prisma } from "../src/prismaClient/prismaClient";
export async function inventorySeed() {
  // Get all characters from the database
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });

  if (characters.length === 0) {
    console.error("No characters found! Make sure characterSeed has run successfully.");
    return;
  }

  console.log(`Found ${characters.length} characters for inventory seeding`);
  const characterIds = characters.map(c => c.id);

  // Lista de nombres de ítems base para buscar en la tabla Item
  const itemNames = [
    "Health Potion",
    "Mana Potion",
    "Stamina Elixir",
    "Coin",
    "Copper Chest",
    "Golden Chest",
    "Steel Chest",
    "Copper Key",
    "Golden Key",
    "Steel Key",
    "Map",
    "Iron Ring",
    "Silver Ring",
    "Cooper Ring",
    "Mage's Arcane Slippers",
    "Mithril Magic Cape",
    "Helm Forgotten King",
    "Studded Gloves",
  ];

  // Buscar los ítems base en la tabla Item
  const items = await prisma.item.findMany({
    where: {
      name: { in: itemNames },
    },
  });

  // Verifica si todos los ítems fueron encontrados
  const missingItems = itemNames.filter(
    (name) => !items.find((item : any) => item.name === name)
  );
  if (missingItems.length > 0) {
    console.error(
      `Los siguientes ítems no se encontraron en la base de datos: ${missingItems.join(", ")}`
    );
    return;
  }

  // Crear datos de inventario para cada personaje
  const characterInventoryData = characterIds
    .map((characterId) => [
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Health Potion")!.id,
        quantity: 4,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Mana Potion")!.id,
        quantity: 7,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Stamina Elixir")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Coin")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Copper Chest")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Golden Chest")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Steel Chest")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Copper Key")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Golden Key")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Steel Key")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Map")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Cooper Ring")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Iron Ring")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Silver Ring")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Mage's Arcane Slippers")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Mithril Magic Cape")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Helm Forgotten King")!.id,
        quantity: 1,
      },
      {
        characterId,
        itemId: items.find((item : any) => item.name === "Studded Gloves")!.id,
        quantity: 1,
      },
    ])
    .flat();

  // Poblar la tabla InventoryItem (inventario de personajes)
  for (const inv of characterInventoryData) {
    await prisma.inventoryItem.create({
      data: {
        characterId: inv.characterId,
        itemId: inv.itemId,
        quantity: inv.quantity,
        // Los demás campos se llenarán con sus valores por defecto (p.ej.: isEquipped, refineLevel, etc.)
      },
    });
  }
}
