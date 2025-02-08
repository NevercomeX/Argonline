import { itemsConsumibles } from "./data/items/itemsConsumibles.js";
import { itemsWeapons } from "./data/items/itemsWeapons.js";
import { itemsArmor } from "./data/items/itemsArmor.js";

export async function itemSeed(prisma) {
  // Combina los datos de los tres archivos
  const allItems = [...itemsConsumibles, ...itemsWeapons, ...itemsArmor];

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
      console.log(`Item ${item.name} ya existe.`);
    }
  }
  await prisma.$disconnect();
}
