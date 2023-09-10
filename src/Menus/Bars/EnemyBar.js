import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getInventory,
  getEnemies,
  getEnemyDrops,
  getEquipment,
  getItems,
  getJobClasses,
  getCharacter,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getInventoryById,
  getCharacterInventoryItems,
  getCharacterInventory,
  getItemNameById,
} from "./Controllers/index.js";

import { drawEnemyHealthBar } from "./Bars/helpers/Bars.js";

export function drawEnemyBar(enemy) {
  console.log("╔" + "═".repeat(lineLength - 2) + "╗");
  console.log(
    `║ Name: ${enemy.name} | Level: ${enemy.baseLevel} | Type: ${enemy.monsterType}`.padEnd(
      lineLength - 1
    ) + "║"
  );
  drawEnemyHealthBar(enemy.health, enemy.maxHealth);
  console.log(
    `║ Reward Base EXP: ${enemy.baseExpAmount} | Reward Job EXP: ${enemy.jobExpAmount}`.padEnd(
      lineLength - 1
    ) + "║"
  );
  console.log("╚" + "═".repeat(lineLength - 2) + "╝");
}
