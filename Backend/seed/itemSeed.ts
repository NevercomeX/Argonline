import { itemsConsumibles } from "./data/items/itemsConsumibles";
import { itemsWeapons } from "./data/items/itemsWeapons";
import { itemsArmor } from "./data/items/itemsArmor";
import { itemsShield } from "./data/items/itemsShield";
import { itemsHeadgear } from "./data/items/itemsHeadgear";
import { itemsGarment } from "./data/items/itemsGarment";
import { itemsFootgear } from "./data/items/itemsFootgear";
import { itemsAccessories } from "./data/items/itemsAccessories";
import { itemsCards } from "./data/items/itemsCards";
import { itemsEtc } from "./data/items/itemsEtc";
import { prisma, ItemType, ElementType } from "../src/prismaClient/prismaClient";



export async function itemSeed() {
  // Combina los datos de los tres archivos
  const allItems = [
    ...itemsConsumibles,
    ...itemsWeapons,
    ...itemsArmor,
    ...itemsShield,
    ...itemsHeadgear,
    ...itemsGarment,
    ...itemsFootgear,
    ...itemsAccessories,
    ...itemsCards,
    ...itemsEtc

];

  // Crear items
  for (let item of allItems) {
    const existingItem = await prisma.item.findUnique({
      where: { name: item.name },
    });

    if (!existingItem) {
      await prisma.item.create({
        data: {
          ...item,
          type: item.type as ItemType,
          element: (item as any).element ? ((item as any).element as ElementType) : undefined,
        },
      });
    } else {
    }
  }

}
