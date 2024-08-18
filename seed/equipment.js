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
  const equipmentData = [
    { characterId, slotType: 'rightHandSlot', itemId: items.find(item => item.name === 'Sword').id }, // Equipar Sword en la mano derecha
    { characterId, slotType: 'leftHandSlot', itemId: items.find(item => item.name === 'Shield').id }, // Equipar Shield en la mano izquierda
    { characterId, slotType: 'upperHeadSlot', itemId: items.find(item => item.name === 'Viking helmet').id }, // Equipar Viking helmet en la cabeza
  ];

  // Poblar la tabla EquipmentSlot
  for (const eq of equipmentData) {
    await prisma.equipmentSlot.create({
      data: eq,
    });
  }

  console.log('EquipmentSlot seeding completed successfully!');
  await prisma.$disconnect();
}

