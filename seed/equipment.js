export async function seedEquipmentSlot(prisma) {
  // Obtener los ítems de la base de datos
  const items = await prisma.item.findMany({
    where: {
      name: {
        in: ["Iron Sword", "Silk Robe", "Iron Helmet"], // Lista de nombres de ítems que quieres equipar
      },
    },
  });

  // Datos de equipamiento para un personaje
  const characterId = 1;

  const equipmentData = {
    characterId,
    rightHandSlot: items.find(item => item.name === 'Iron Sword')?.id || null,
    bodySlot: items.find(item => item.name === 'Silk Robe')?.id || null,
    upperHeadSlot: items.find(item => item.name === 'Iron Helmet')?.id || null,
  };

  console.log(equipmentData);
  // Poblar la tabla EquipmentSlot
  await prisma.equipmentSlot.create({
    data: equipmentData,
  });

  console.log('EquipmentSlot seeding completed successfully!');
  await prisma.$disconnect();
}
