import { PrismaClient } from "@prisma/client";
import { characterSeed } from "./characterSeed.js";
import { itemSeed } from "./itemSeed.js";
import { inventorySeed } from "./inventoryItemSeed.js";
import { storageSeed } from "./storageSeed.js";
import { recipeSeed } from "./recipeSeed.js";
import { equipmentSeed } from "./equipmentSeed.js";
import { monsterDropSeed } from "./monsterDropSeed.js";
import { monsterSeed } from "./monsterSeed.js";
import { monsterSpawnSeed } from "./monsterSpawnSeed.js";
import { userSeed } from "./userSeed.js";
import { mapSeed } from "./mapSeed.js";
import { characterSkillSeed } from "./characterSkillSeed.js";
import { skillSeed } from "./skillSeed.js";
import { itemInstanceSeed } from "./itemInstance.js";

import Table from "cli-table3";
import cliProgress from "cli-progress";

// Crear una instancia única de PrismaClient
const prisma = new PrismaClient();

// Función para resetear la base de datos
async function resetDatabase() {
  try {
    // Descomenta las líneas que necesites para eliminar datos de cada tabla.
    await prisma.inventoryItem.deleteMany({});
    await prisma.storageItem.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.map.deleteMany({});
    await prisma.character.deleteMany({});
    await prisma.equipmentItem.deleteMany({});
    await prisma.recipe.deleteMany({});
    await prisma.monster.deleteMany({});
    await prisma.characterSkill.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.monsterDrop.deleteMany({});
    await prisma.monsterSpawn.deleteMany({});
    await prisma.itemInstance.deleteMany({});
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
}

// Función principal de seeding
async function seed() {
  // Array de tareas de seeding. Descomenta las que necesites ejecutar.
  const tasks = [
    { name: "Reset Database", fn: resetDatabase },
    { name: "User Seed", fn: userSeed },
    { name: "Character Seed", fn: characterSeed },
    { name: "Item Seed", fn: itemSeed },
    { name: "Skill Seed", fn: skillSeed },
    { name: "Map Seed", fn: mapSeed },
    { name: "Monster Seed", fn: monsterSeed },
    { name: "Recipe Seed", fn: recipeSeed },
    { name: "Equipment Seed", fn: equipmentSeed },
    { name: "Character Skill Seed", fn: characterSkillSeed },
    { name: "Monster Spawn Seed", fn: monsterSpawnSeed },
    { name: "Monster Drop Seed", fn: monsterDropSeed },
    { name: "Inventory Seed", fn: inventorySeed },
    { name: "Storage Seed", fn: storageSeed },
    { name: "Item Instance Seed", fn: itemInstanceSeed },
  ];

  const results = [];

  // Inicializar la barra de progreso
  const progressBar = new cliProgress.SingleBar({
    format: 'Seeding Progress |{bar}| {percentage}% | {task}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  progressBar.start(tasks.length, 0, { task: "Iniciando..." });

  try {
    for (const task of tasks) {
      try {
        await task.fn(prisma);
        results.push([task.name, "✅ Success"]);
      } catch (error) {
        results.push([task.name, `❌ Failed: ${error.message}`]);
        console.error(`Error in task ${task.name}:`, error);
      }
      // Actualizar la barra de progreso
      progressBar.increment({ task: task.name });
    }
    progressBar.stop();

    // Crear y mostrar la tabla de resultados
    const table = new Table({
      head: ["Tarea", "Resultado"],
      colWidths: [30, 50],
    });
    results.forEach(result => table.push(result));
    console.log(table.toString());
    console.log("Proceso de seeding completado! ✅");
  } catch (error) {
    progressBar.stop();
    console.error("Ocurrió un error durante el proceso de seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el seeding
seed();
