import { prisma } from "../../../Prisma/prismaClient.js";

/**
 * Función para procesar la compra de un ítem.
 * Se descuenta el costo total (item.buyPrice * quantity) del zeny del personaje
 * y se agrega el ítem al inventario del personaje.
 */
export async function purchaseItem({ characterId, itemId, quantity = 1 }) {
  if (quantity < 1) {
    throw new Error("Cantidad inválida");
  }

  return await prisma.$transaction(async (tx) => {
    // 1. Buscar el personaje

    const character = await tx.character.findUnique({
      where: { id: characterId },
    });
    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    // 2. Buscar el ítem a comprar
    const item = await tx.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error("Ítem no encontrado");
    }

    // 3. Calcular el costo total y verificar que el personaje tenga suficiente zeny
    const totalCost = item.buyPrice * quantity;
    if (character.zeny < totalCost) {
      throw new Error("No tienes suficiente zeny");
    }

    // 4. Actualizar los zeny del personaje
    await tx.character.update({
      where: { id: characterId },
      data: { zeny: character.zeny - totalCost },
    });

    // 5. Agregar el ítem al inventario
    // Si el ítem es stackable, se busca si ya existe para actualizar la cantidad.
    if (item.isStackable) {
      const existingInventory = await tx.inventoryItem.findFirst({
        where: {
          characterId,
          itemId,
          itemInstanceId: null, // Ítems que no requieren instancia
        },
      });
      if (existingInventory) {
        await tx.inventoryItem.update({
          where: { id: existingInventory.id },
          data: { quantity: existingInventory.quantity + quantity },
        });
      } else {
        await tx.inventoryItem.create({
          data: {
            characterId,
            itemId,
            quantity,
          },
        });
      }
    } else {
      // Si el ítem no es stackable, se crean registros individuales.
      // Debido a la restricción única en (characterId, itemId, itemInstanceId),
      // para cada unidad se crea un registro nuevo.
      for (let i = 0; i < quantity; i++) {
        await tx.inventoryItem.create({
          data: {
            characterId,
            itemId,
            quantity: 1,
          },
        });
      }
    }

    return { message: "Compra exitosa", remainingZeny: character.zeny - totalCost };
  });
}

/**
 * Función para procesar la venta de un ítem.
 * Se elimina o reduce la cantidad del ítem en el inventario del personaje
 * y se incrementan los zeny del personaje según el precio de venta.
 */
export async function sellItem({ characterId, inventoryItemId, quantity = 1 }) {
  if (quantity < 1) {
    throw new Error("Cantidad inválida");
  }

  return await prisma.$transaction(async (tx) => {
    // 1. Buscar el ítem en el inventario
    const inventoryItem = await tx.inventoryItem.findUnique({
      where: { id: inventoryItemId },
      include: { item: true },
    });
    if (!inventoryItem || inventoryItem.characterId !== characterId) {
      throw new Error("Ítem en inventario no encontrado");
    }

    // 2. Verificar que se tenga la cantidad necesaria para vender
    if (inventoryItem.quantity < quantity) {
      throw new Error("No tienes suficientes unidades para vender");
    }

    // 3. Calcular el valor de la venta
    const sellValue = inventoryItem.item.sellPrice * quantity;

    // 4. Actualizar el inventario:
    //    - Si la cantidad vendida es igual a la existente, se elimina el registro.
    //    - En caso contrario, se actualiza la cantidad.
    if (inventoryItem.quantity === quantity) {
      await tx.inventoryItem.delete({
        where: { id: inventoryItemId },
      });
    } else {
      await tx.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { quantity: inventoryItem.quantity - quantity },
      });
    }

    // 5. Actualizar los zeny del personaje
    const character = await tx.character.findUnique({
      where: { id: characterId },
    });
    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    await tx.character.update({
      where: { id: characterId },
      data: { zeny: character.zeny + sellValue },
    });

    return { message: "Venta exitosa", gainedZeny: sellValue };
  });
}

export async function getShopItems(page = 1, limit = 12) {
  const skip = (page - 1) * limit;
  
  // Se filtran los ítems con buyPrice > 0
  const totalItems = await prisma.item.count({
    where: { buyPrice: { gt: 0 } }
  });
  
  const items = await prisma.item.findMany({
    where: { buyPrice: { gt: 0 } },
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