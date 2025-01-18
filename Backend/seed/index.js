import { PrismaClient } from "@prisma/client";
import { characterSeed } from "./character.js";
import { enemySeed } from "./enemies.js";
import { itemSeed } from "./items.js";
import { enemyDropSeed } from "./enemydrop.js";
import { inventorySeed } from "./inventary.js";
import { jobClassSeed } from "./jobClass.js";
import { userSeed } from "./users.js";
import { seedEquipmentSlot } from "./equipment.js";
import { seedItemInstances } from "./itemInstance.js";
import { createItemTemplates } from "./itemTemplate.js";
import Table from "cli-table3";
import cliProgress from "cli-progress";

const prisma = new PrismaClient();

// Función para resetear la base de datos
async function resetDatabase() {

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

  } catch (error) {
    console.error("Error al resetear la base de datos:", error);
    throw error; // Lanzar el error para que se capture en el proceso de seeding
  }
}

// Función principal de seeding
async function seed() {
  const results = [];
  const tasks = [
    { name: "Reset Database", fn: resetDatabase },
    { name: "User Seed", fn: userSeed },
    { name: "Job Class Seed", fn: jobClassSeed },
    { name: "Character Seed", fn: characterSeed },
    { name: "Item Seed", fn: itemSeed },
    { name: "Enemy Seed", fn: enemySeed },
    { name: "Enemy Drop Seed", fn: enemyDropSeed },
    { name: "Item Template Seed", fn: createItemTemplates },
    { name: "Item Instances Seed", fn: seedItemInstances },
    { name: "Inventory Seed", fn: inventorySeed },
    { name: "Equipment Slot Seed", fn: seedEquipmentSlot },
  ];

  // Inicializar la barra de progreso
  const progressBar = new cliProgress.SingleBar({
    format: 'Progreso de Seeding |{bar}| {percentage}% | {task}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  progressBar.start(tasks.length, 0, { task: "Iniciando..." });

  try {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      try {
        await task.fn(prisma);
        results.push([task.name, "✅ Success"]);
      } catch (error) {
        results.push([task.name, `❌ Failed: ${error.message}`]);
      }
      progressBar.update(i + 1, { task: task.name });
    }

    progressBar.stop();
    await prisma.$disconnect();

    // Crear la tabla de resultados
    const table = new Table({
      head: ["Tarea", "Resultado"],
      colWidths: [30, 50],
    });

    // Añadir los resultados a la tabla
    results.forEach(result => table.push(result));

    // Mostrar la tabla en la consola
    console.log(table.toString());
    console.log("Proceso de seeding completado! ✅");
  } catch (error) {
    progressBar.stop();
    console.error("Ocurrió un error durante el seeding:", error);
    await prisma.$disconnect();
  }
}

// Ejecutar el seeding
seed();
