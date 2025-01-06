import { prisma } from "../../../Prisma/prismaClient.js";

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
  if (!id) {
    console.error("getItemNameById: El ID proporcionado es nulo o indefinido.");
    return "Unknown Item";  // Devuelve un nombre por defecto para manejar el error
  }

  try {
    // Primero buscamos en la tabla de ítems normales
    let item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    // Si no encontramos un ítem normal, buscamos en la tabla de instancias de ítems
    if (!item) {
      const itemInstance = await prisma.itemInstance.findUnique({
        where: { id: parseInt(id) },  // Buscamos por el mismo ID
        include: { itemTemplate: true },  // Incluimos el template del ítem
      });

      // Si encontramos una instancia, usamos el nombre del template del ítem
      if (itemInstance) {
        item = itemInstance ;
      }
    }

    // Si encontramos un ítem o una instancia, devolvemos el nombre
    return item ;  // Devuelve un nombre o "Unknown Item" si no se encuentra nada

  } catch (error) {
    console.error(`Error al obtener el ítem con ID ${id}:`, error);
    return "Unknown Item";  // En caso de error, devolvemos un nombre por defecto
  }
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
