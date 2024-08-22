import { PrismaClient } from "@prisma/client";
import { characterSeed } from "./character.js";
import { enemySeed } from "./enemies.js";
import { itemSeed } from "./items.js";
import { enemyDropSeed } from "./enemydrop.js";
import { inventarySeed } from "./inventary.js";
import { jobClassSeed } from "./jobClass.js";
import { userSeed } from "./users.js";
import { seedEquipmentSlot } from "./equipment.js";
import { createItemInstances } from "./itemInstance.js";
import { createItemTemplates } from "./itemTemplate.js";

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log("Resetting database...");

  try {
    await prisma.inventory.deleteMany({});
    await prisma.equipmentSlot.deleteMany({});
    await prisma.enemyDrop.deleteMany({});
    await prisma.enemy.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.character.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.jobClass.deleteMany({});
    await prisma.itemInstance.deleteMany({});
    await prisma.itemTemplate.deleteMany({}); 

    console.log("Database reset successful! ✅");
  } catch (error) {
    console.error("Error resetting database:", error);
  }
}

async function seed() {
  await resetDatabase();

  try {
    await userSeed(prisma);
    await jobClassSeed(prisma);
    await characterSeed(prisma);
    await itemSeed(prisma);
    await enemySeed(prisma);
    await enemyDropSeed(prisma);
    const itemTemplates = await createItemTemplates(prisma); 
    const itemTemplateIds = itemTemplates.map(template => template.id);
    await inventarySeed(prisma);
    await createItemInstances(prisma, itemTemplateIds, 1); 
    await seedEquipmentSlot(prisma);


    await prisma.$disconnect();
    console.log("Seed successful! ✅");
  } catch (error) {
    console.error("An error occurred during seeding:", error);
    await prisma.$disconnect();
  }
}

seed();
