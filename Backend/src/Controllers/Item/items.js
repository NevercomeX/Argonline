import { prisma } from "../../Prisma/prismaClient.js";

export async function getAllItems(page = 1, limit = 10) {
  const skip = (page - 1) * limit; // Calcular el salto de registros
  const totalItems = await prisma.item.count(); // Contar todos los ítems
  const items = await prisma.item.findMany({
    skip: skip,
    take: limit, // Limitar la cantidad de registros a tomar
  });

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / limit), // Calcular total de páginas
    currentPage: page,
  };
}
export async function getItemsById(id) {
  return await prisma.item.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function getItemsByName(itemIds) {
  const itemNamesMap = new Map();
  for (const itemId of itemIds) {
    if (!itemId) {
      console.error("getItemNames: Encontrado itemId nulo o indefinido.");
      continue; // Saltar itemIds inválidos
    }
    const itemName = await getItemNameById(itemId);
    itemNamesMap.set(itemId, itemName);
  }
  return itemNamesMap;
}

export async function getItemNameById(id) {
  if (!id) {
    console.error("getItemNameById: El ID proporcionado es nulo o indefinido.");
    return "Unknown Item"; // Devuelve un nombre por defecto para manejar el error
  }

  let item = await prisma.item.findUnique({
    where: { id: parseInt(id) },
  });

  if (!item) {
    const itemInstance = await prisma.itemInstance.findUnique({
      where: { id: parseInt(id) },
      include: { itemTemplate: true },
    });

    if (itemInstance) {
      item = { name: itemInstance.itemTemplate.name };
    }
  }

  return item ? item.name : "Unknown Item";
}
