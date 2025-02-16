// equipmentSeed.js

export async function equipmentSeed(prisma) {
  // Lista de IDs de los personajes a quienes se les asignará equipamiento
  const characterIds = [1, 2]; // Ajusta estos valores según tus datos existentes

  // Definición de asignaciones: para cada personaje se asignarán ciertos ítems a determinados slots.
  // En este ejemplo, asignamos:
  // - "Iron Sword" al slot "WEAPON"
  // - "Iron Helmet" al slot "HEAD_TOP"
  const equipmentAssignments = [
    { slot: "WEAPON", itemName: "Novice Dagger" },
    { slot: "ARMOR", itemName: "Tattered Shirt" },
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
        const item = items.find((i) => i.name === assignment.itemName);
        await prisma.equipmentItem.create({
          data: {
            characterId,
            itemId: item.id,
            slot: assignment.slot, // Debe coincidir con un valor del enum EquipmentSlot
            durability: 100,       // Valor por defecto
            refineLevel: 0,        // Valor por defecto
            cards: null,           // Se puede asignar null o un array JSON si se requiere
            element: "NEUTRAL",    // Valor por defecto del enum ElementType
          },
        });
      } else {
        console.log(`El personaje ${characterId} ya tiene asignado un ítem en el slot ${assignment.slot}.`);
      }
    }
  }
}
