// equipmentSeed.js

import { prisma, EquipmentSlot, ElementType, Prisma } from "../src/prismaClient/prismaClient";
export async function equipmentSeed() {
  // Get all characters from the database
  const characters = await prisma.character.findMany({
    select: { id: true, name: true },
  });

  if (characters.length === 0) {
    console.error("No characters found! Make sure characterSeed has run successfully.");
    return;
  }

  console.log(`Found ${characters.length} characters for equipment seeding`);
  const characterIds = characters.map(c => c.id);

  // Definición de asignaciones: para cada personaje se asignarán ciertos ítems a determinados slots.
  // En este ejemplo, asignamos:
  // - "Iron Sword" al slot "WEAPON"
  // - "Iron Helmet" al slot "HEAD_TOP"
  const equipmentAssignments: { slot: EquipmentSlot; itemName: string }[] = [
    { slot: EquipmentSlot.WEAPON, itemName: "Novice Dagger" },
    { slot: EquipmentSlot.ARMOR, itemName: "Tattered Shirt" },
  ];

  // Extraer la lista de nombres de ítems requeridos
  const requiredItemNames = equipmentAssignments.map((eq) => eq.itemName);

  // Buscar en la tabla Item los ítems necesarios
  const items = await prisma.item.findMany({
    where: { name: { in: requiredItemNames } },
  });

  // Verificar si faltan ítems
  const missingItems = requiredItemNames.filter(
    (name) => !items.find((item) => item.name === name)
  );
  if (missingItems.length > 0) {
    console.error(
      `Los siguientes ítems necesarios para EquipmentItem no se encontraron: ${missingItems.join(", ")}`
    );
    return;
  }

  // Para cada personaje, crear la asignación de equipamiento para cada slot definido
  for (const characterId of characterIds) {
    for (const assignment of equipmentAssignments) {
      // Verificar que el personaje aún no tenga un ítem asignado en ese slot (por la restricción @@unique)
      const existingEquip = await prisma.equipmentItem.findFirst({
        where: { characterId, slot: assignment.slot },
      });
      if (!existingEquip) {
        const item = items.find((i) => i.name === assignment.itemName)!;
        await prisma.equipmentItem.create({
          data: {
            characterId,
            itemId: item.id,
            slot: assignment.slot, // Debe coincidir con un valor del enum EquipmentSlot
            durability: 100,       // Valor por defecto
            refineLevel: 0,        // Valor por defecto
            cards: Prisma.DbNull,  // Se puede asignar null o un array JSON si se requiere
            element: ElementType.NEUTRAL,    // Valor por defecto del enum ElementType
          },
        });
      } else {
        console.log(`El personaje ${characterId} ya tiene asignado un ítem en el slot ${assignment.slot}.`);
      }
    }
  }
}
