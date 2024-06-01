import { characterSeed } from "./character.js";
import { enemySeed } from "./enemies.js";
import { itemSeed } from "./items.js";
import { PrismaClient } from "@prisma/client";
import { enemyDropSeed } from "./enemydrop.js";
import { inventarySeed } from "./inventary.js";
import { jobClassSeed } from "./jobClass.js";
import { userSeed } from "./users.js";
import { equipmentSeed } from "./equipment.js";

const prisma = new PrismaClient();

async function seed(prisma) {
  try {
    await userSeed(prisma);
    console.log("=====================================");
    await characterSeed(prisma);
    console.log("=====================================");
    await enemySeed(prisma);
    console.log("=====================================");
    await jobClassSeed(prisma);
    console.log("=====================================");
    await itemSeed(prisma);
    console.log("=====================================");
    await enemyDropSeed(prisma);
    console.log("=====================================");
    await inventarySeed(prisma);
    console.log("=====================================");
    await equipmentSeed(prisma);
    console.log("=====================================");
    await prisma.$disconnect();
    console.log("Seed successful! ✅");
    return true;
  } catch (error) {
    console.error("An error occurred during seeding:", error);
    return false;
  }
}

seed();
