import { items } from "./data/items.js";

export async function itemSeed(prisma) {
  // Crear items
  for (let item of items) {
    const existingItem = await prisma.item.findUnique({
      where: { name: item.name },
    });

    if (!existingItem) {
      await prisma.item.create({
        data: item,
      });

      console.log(`Item ${item.name} creado.✅`);
    } else {
      console.log(`Item ${item.name} ya existe. ✅`);
    }
  }
}
