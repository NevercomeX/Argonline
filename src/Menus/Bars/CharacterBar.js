import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getInventory,
  getEnemies,
  getEnemyDrops,
  getEquipment,
  getItems,
  getJobClasses,
  getCharacterById,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getInventoryById,
  getCharacterInventoryItems,
  getCharacterInventory,
  getItemNameById,
} from "../../Controllers/index.js";

import {
  drawHealthBar,
  drawManaBar,
  drawExperienceBar,
  drawJobExperienceBar,
} from "./helpers/Bars.js";

export async function drawCharacterInfo(id) {

  console.log(id)
  const character = await getCharacterById(id);
  const lineLength = 100; // Define la longitud de la línea
  let infoLine = `║ Name: ${character.name} | BLevel: ${character.baseLevel} | JLevel: ${character.jobLevel} | Job: ${character.jobclassId}`;
  let paddingLength = lineLength - infoLine.length;
  let padding = " ".repeat(paddingLength);
  infoLine += padding + " ║";

  console.log("╔" + "═".repeat(lineLength) + "╗");
  console.log(infoLine);
  drawHealthBar(character.health, character.maxHealth);
  drawManaBar(character.mana, character.maxMana);
  drawExperienceBar(character.baseExp, character.maxBaseExp);
  drawJobExperienceBar(character.jobExp, character.maxJobExp);
  console.log("╚" + "═".repeat(lineLength) + "╝");
  console.log(" ");
}
