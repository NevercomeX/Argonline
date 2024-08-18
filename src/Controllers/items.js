import { prisma } from "../Prisma/prismaClient.js";
export async function getItems() {
  return await prisma.item.findMany();
}

export async function getItemsById(id) {
  return await prisma.item.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getItemsByName(name) {
  return await prisma.item.findUnique({
    where: { name: name },
  });
}

//get item name by id
export async function getItemNameById(id) {
  // Primero, intenta buscar en la tabla de Item
  let item = await prisma.item.findUnique({
    where: { id: id },
  });

  // Si no se encuentra el ítem, intenta buscar en la tabla de ItemTemplate
  if (!item) {
    const itemInstance = await prisma.itemInstance.findUnique({
      where: { id: id },
      include: { itemTemplate: true }, // Incluye la relación con ItemTemplate
    });

    if (itemInstance) {
      item = {
        name: itemInstance.itemTemplate.name,
      };
    }
  }

  return item ? item.name : "Unknown Item";
}
