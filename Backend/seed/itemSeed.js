import { itemsConsumibles } from "./data/items/itemsConsumibles.js";
import { itemsWeapons } from "./data/items/itemsWeapons.js";
import { itemsArmor } from "./data/items/itemsArmor.js";
import { itemsShield } from "./data/items/itemsShield.js";
import { itemsHeadgear } from "./data/items/itemsHeadgear.js";
import { itemsGarment } from "./data/items/itemsGarment.js";
import { itemsFootgear } from "./data/items/itemsFootgear.js"
import { itemsAccessories } from "./data/items/itemsAccessories.js";
import { itemsCards } from "./data/items/itemsCards.js";

export async function itemSeed(prisma) {
  // Combina los datos de los tres archivos
  const allItems = [...itemsConsumibles,
    ...itemsWeapons,
    ...itemsArmor,
    ...itemsShield,
    ...itemsHeadgear,
    ...itemsGarment,
    ...itemsFootgear,
    ...itemsAccessories,
    ...itemsCards,
];

  // Crear items
  for (let item of allItems) {
    const existingItem = await prisma.item.findUnique({
      where: { name: item.name },
    });

    if (!existingItem) {
      await prisma.item.create({
        data: item,
      });
    } else {
    }
  }
  await prisma.$disconnect();
}
