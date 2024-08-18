import readlineSync from "readline-sync";
import { getCharacterById } from "../Controllers/index.js";
import { drawCharacterInfo } from "./Bars/CharacterBar.js";

export async function StatsMenu(id) {
  console.clear();
  await drawCharacterInfo(id);
  const character = await getCharacterById(id);
  console.log(" ");
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log(
    `║ ${character.name} - Nivel ${character.baseLevel} - Job: ${character.jobclassId}\n` +
      `║ STR: ${character.str}\n` +
      `║ AGI: ${character.agi}\n` +
      `║ VIT: ${character.vit}\n` +
      `║ INT: ${character.int}\n` +
      `║ DEX: ${character.dex}\n` +
      `║ LUK: ${character.luk}\n` +
      `║ JobClassId: ${character.jobclassId}\n` +
      `║ Max Base EXP: ${character.maxBaseExp}\n` +
      `║ BASE EXP: ${character.baseExp}\n` +
      `║ Max Job EXP: ${character.maxJobExp}\n` +
      `║ JOB EXP: ${character.jobExp}\n` +
      `║ Max HP: ${character.maxHealth}\n` +
      `║ HP: ${character.health}\n` +
      `║ Max MP: ${character.maxMana}\n` +
      `║ MP: ${character.mana}\n` +
      `║ ATK: ${character.attackPower}\n` +
      `║ MATK: ${character.magicPower}\n` +
      `║ DEF: ${character.defense}\n` +
      `║ MDEF: ${character.magicDefense}\n` +
      `║ Skill Points: ${character.skillPoints}\n` +
      `║ Job Level: ${character.jobLevel}\n`,
  );
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(" ");
  readlineSync.question("Press any key to return to the main menu.");
}
