import { PrismaClient } from "@prisma/client";
import { characterSeed } from "./character.js";
import { enemySeed } from "./enemies.js";
import { itemSeed } from "./items.js";
import { enemyDropSeed } from "./enemydrop.js";
import { inventarySeed } from "./inventary.js";
import { jobClassSeed } from "./jobClass.js";
import { userSeed } from "./users.js";
import { equipmentSeed } from "./equipment.js";

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log("Resetting database...");

  try {
    await prisma.inventory.deleteMany({});
    await prisma.equipment.deleteMany({});
    await prisma.enemyDrop.deleteMany({});
    await prisma.enemy.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.character.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.jobClass.deleteMany({});

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
    await inventarySeed(prisma);
    await equipmentSeed(prisma);

    await prisma.$disconnect();
    console.log("Seed successful! ✅");

  } catch (error) {
    console.error("An error occurred during seeding:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();