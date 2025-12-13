import { prisma } from "../../../prismaClient/prismaClient";

/**
 * Obtiene todos los ítems con paginación.
 */
export async function getAllItems(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const totalItems = await prisma.item.count();
  const items = await prisma.item.findMany({
    skip,
    take: limit,
  });

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  };
}

/**
 * Obtiene un ítem por su ID.
 */
export async function getItemById(id: any) {
  if (!id) {
    console.error("getItemById: El ID proporcionado es nulo o indefinido.");
    return "Unknown Item";
  }

  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    return item || "Unknown Item";
  } catch (error) {
    console.error(`Error al obtener el ítem con ID ${id}:`, error);
    return "Unknown Item";
  }
}

/**
 * Obtiene los nombres de múltiples ítems por sus IDs.
 */
export async function getItemsByIds(itemIds: any) {
  if (!itemIds || !Array.isArray(itemIds)) {
    console.error("getItemsByIds: La lista de IDs proporcionada no es válida.");
    return new Map();
  }

  const items = await prisma.item.findMany({
    where: { id: { in: itemIds.map(id => parseInt(id)) } },
    select: { id: true, name: true },
  });

  // Convertimos la respuesta en un Map
  return new Map(items.map(item => [item.id, item.name]));
}

/**
 * Obtiene el nombre de un ítem por su ID.
 */
export async function getItemNameById(id: any) {
  if (!id) {
    console.error("getItemNameById: El ID proporcionado es nulo o indefinido.");
    return "Unknown Item";
  }

  const item = await prisma.item.findUnique({
    where: { id: parseInt(id) },
    select: { name: true },
  });

  return item ? item.name : "Unknown Item";
}
