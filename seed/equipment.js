export async function seedEquipmentSlot(prisma) {
  // Obtener los ítems de la base de datos
  const items = await prisma.item.findMany({
    where: {
      name: {
        in: ["Sword", "Shield", "Viking helmet"], // Lista de nombres de ítems que quieres equipar
      },
    },
  });

  // Datos de equipamiento para un personaje
  const characterId = 1;

  const equipmentData = {
    characterId,
    rightHandSlot: items.find(item => item.name === 'Sword')?.id || null,
    leftHandSlot: items.find(item => item.name === 'Shield')?.id || null,
    upperHeadSlot: items.find(item => item.name === 'Viking helmet')?.id || null,
  };

  // Poblar la tabla EquipmentSlot
  await prisma.equipmentSlot.create({
    data: equipmentData,
  });

  console.log('EquipmentSlot seeding completed successfully!');
  await prisma.$disconnect();
}
