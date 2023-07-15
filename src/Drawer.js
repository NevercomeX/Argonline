import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";

const lineLength = 60; // The total length of the line

export function drawEnemyHealthBar(currentHP, maxHP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentHP / maxHP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  const healthLine = `║ HP:       [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`;
  const lineLength = 59; // The total length of the line, adjust as needed
  const paddingLength = lineLength - healthLine.length;
  const padding = " ".repeat(paddingLength);

  console.log(healthLine + padding + "║");
}

export function drawHealthBar(currentHP, maxHP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentHP / maxHP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let healthLine = `║ HP:       [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`;
  let paddingLength = lineLength - healthLine.length;
  let padding = " ".repeat(paddingLength);
  healthLine += padding + " ║";

  console.log(healthLine);
}

export function drawManaBar(currentSP, maxSP) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentSP / maxSP) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let manaLine = `║ Mana:     [${filledBar}${emptyBar}] ${currentSP}/${maxSP}`;
  let paddingLength = lineLength - manaLine.length;
  let padding = " ".repeat(paddingLength);
  manaLine += padding + " ║";

  console.log(manaLine);
}

export function drawExperienceBar(currentExp, maxExp) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentExp / maxExp) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let expLine = `║ Base Exp: [${filledBar}${emptyBar}] ${currentExp}/${maxExp}`;
  let paddingLength = lineLength - expLine.length;
  let padding = " ".repeat(paddingLength);
  expLine += padding + " ║";

  console.log(expLine);
}

export function drawJobExperienceBar(currentJobExp, maxJobExp) {
  const barLength = 20; // Total length of the bar
  let filledLength = Math.round((currentJobExp / maxJobExp) * barLength); // Length of the filled bar
  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  let jobExpLine = `║ Job Exp:  [${filledBar}${emptyBar}] ${currentJobExp}/${maxJobExp}`;
  let paddingLength = lineLength - jobExpLine.length;
  let padding = " ".repeat(paddingLength);
  jobExpLine += padding + " ║";

  console.log(jobExpLine);
}
export function drawCharacterInfo(character) {
  const lineLength = 60; // Define la longitud de la línea
  let infoLine = `║ Name: ${character.name} | BLevel: ${character.baseLevel} | JLevel: ${character.jobLevel} | Job: ${character.job}`;
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
}

//draw enemy bar

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

export async function drawMainMenu(character) {
  console.clear();
  drawCharacterInfo(character);
  console.log(" ");
  const answer = await select({
    message: "Menu Princial",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(14) + "╗"),

      {
        name: "║ Combat       ║",
        value: 1,
        description: "Fight against monsters",
      },
      {
        name: "║ Stats        ║",
        value: 2,
        description: "View your stats",
      },
      {
        name: "║ Equipment    ║",
        value: 3,
        description: "View your equipment",
      },
      {
        name: "║ Inventory    ║",
        value: 4,
        description: "View your inventory",
      },

      {
        name: "║ Options      ║",
        value: 5,
        description: "View the options",
      },
      {
        name: "║ Save         ║",
        value: 6,
        description: "Save your progress",
      },
      {
        name: "║ Quit         ║",
        value: 7,
        description: "Quit the game",
      },
      new Separator(" ╚" + "═".repeat(14) + "╝"),
      new Separator(" "),
    ],
    pageSize: 15,
  });
  return answer;
}

export async function drawCombatMenu() {
  const actionc = await select({
    message: "Menu de Combate",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(14) + "╗"),

      {
        name: "║ Attack       ║",
        value: 1,
        description: "Attack the enemy",
      },
      {
        name: "║ Skills       ║",
        value: 2,
        description: "Use a skill",
      },
      {
        name: "║ Items        ║",
        value: 3,
        description: "Use an item",
      },
      {
        name: "║ Run          ║",
        value: 4,
        description: "Run away from the enemy",
      },
      new Separator(" ╚" + "═".repeat(14) + "╝"),
      new Separator(" "),
    ],
    pageSize: 15,
  });

  return actionc; // Make sure this line is within the function body
}
export function drawStatistics(character) {
  console.clear();
  drawCharacterInfo(character);
  console.log(" ");
  console.log("STATS");

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log(
    `║ ${character.name} - Nivel ${character.baseLevel} - Job: ${character.job}\n` +
      `║ STR: ${character.str}\n` +
      `║ AGI: ${character.agi}\n` +
      `║ VIT: ${character.vit}\n` +
      `║ INT: ${character.int}\n` +
      `║ DEX: ${character.dex}\n` +
      `║ LUK: ${character.luk}\n` +
      `║ BASE EXP: ${character.baseExp}\n` +
      `║ JOB EXP: ${character.jobExp}\n` +
      `║ HP: ${character.health}\n` +
      `║ MP: ${character.mana}\n` +
      `║ ATK: ${character.attackPower}\n` +
      `║ MATK: ${character.magicPower}\n` +
      `║ DEF: ${character.defense}\n` +
      `║ MDEF: ${character.magicDefense}\n` +
      `║ ATK Speed: ${character.attackSpeed}\n` +
      `║ Evasion: ${character.evasion}\n` +
      `║ Critical Rate: ${character.criticalRate}`
  );
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(" ");
}
