// Mejorar un ítem
import { prisma } from "../../Prisma/prismaClient.js";

export default async function upgradeItem(itemInstanceId, enhancementValue) {
  const itemInstance = await prisma.itemInstance.findUnique({
    where: { id: itemInstanceId },
  });

  if (!itemInstance) throw new Error("Item not found");

  const upgradedItem = await prisma.itemInstance.update({
    where: { id: itemInstanceId },
    data: {
      currentAttack: itemInstance.currentAttack + enhancementValue,
      currentDefense: itemInstance.currentDefense + enhancementValue,
      upgradeLevel: itemInstance.upgradeLevel + 1,
    },
  });

  console.log(
    `Item ${itemInstanceId} upgraded to level ${upgradedItem.upgradeLevel}`,
  );
  return upgradedItem;
}
