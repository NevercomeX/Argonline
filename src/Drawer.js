import readlineSync from "readline-sync";

export function drawHealthBar(currentHP, maxHP) {
  const barLength = 20; // Longitud total de la barra
  let filledLength = Math.round((currentHP / maxHP) * barLength); // Longitud de la barra llena

  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`║ HP:       [${filledBar}${emptyBar}] ${currentHP}/${maxHP}`);
}

export function drawManaBar(currentSP, maxSP) {
  const barLength = 20; // Longitud total de la barra
  let filledLength = Math.round((currentSP / maxSP) * barLength); // Longitud de la barra llena

  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`║ Mana:     [${filledBar}${emptyBar}] ${currentSP}/${maxSP}`);
}

export function drawExperienceBar(currentExp, maxExp) {
  const barLength = 20; // Longitud total de la barra
  let filledLength = Math.round((currentExp / maxExp) * barLength); // Longitud de la barra llena

  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(`║ Base Exp: [${filledBar}${emptyBar}] ${currentExp}/${maxExp}`);
}

export function drawJobExperienceBar(currentJobExp, maxJobExp) {
  const barLength = 20; // Longitud total de la barra
  let filledLength = Math.round((currentJobExp / maxJobExp) * barLength); // Longitud de la barra llena

  if (filledLength < 0) filledLength = 0;

  const filledBar = "=".repeat(filledLength);
  const emptyBar = " ".repeat(barLength - filledLength);

  console.log(
    `║ Job Exp:  [${filledBar}${emptyBar}] ${currentJobExp}/${maxJobExp}`
  );
}

export function drawCharacterInfo(character) {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log(
    "║ Name: " +
      character.name +
      " | BLevel: " +
      character.baseLevel +
      " | JLevel: " +
      character.jobLevel +
      " | Job: " +
      character.job
  );
  drawHealthBar(character.health, character.maxHealth);
  drawManaBar(character.mana, character.maxMana);
  drawExperienceBar(character.baseExp, character.maxBaseExp);
  drawJobExperienceBar(character.jobExp, character.maxJobExp);
  console.log("╚════════════════════════════════════════════════════════╝");
}

//draw enemy bar

export function drawEnemyBar(enemy) {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log(
    "║ Name: " +
      enemy.name +
      " | Level: " +
      enemy.baseLevel +
      " | Type: " +
      enemy.monsterType
  );
  drawHealthBar(enemy.health, enemy.maxHealth);
  console.log(
    "║ Reward Base EXP: " +
      enemy.baseExpAmount +
      " | Reward Job EXP: " +
      enemy.jobExpAmount
  );
  console.log("╚════════════════════════════════════════════════════════╝");
}

export function drawMainMenu(character) {
  console.clear();
  drawCharacterInfo(character);
  console.log(" ");

  console.log("☠️❌❌❌☠️❌❌❌☠️");
  console.log("❌              ❌");
  console.log("❌ 1. Combat    ❌");
  console.log("❌ 2. Stats     ❌");
  console.log("❌ 3. Equipment ❌");
  console.log("☠️ 4. Inventory ☠️");
  console.log("❌ 5. Options   ❌");
  console.log("❌ 6. Save      ❌");
  console.log("❌ 7. Quit      ❌");
  console.log("❌              ❌");
  console.log("☠️❌❌❌☠️❌❌❌☠️");
  console.log(" ");
  const option = readlineSync.question("Select an option: ");
  return option;
}

export function drawCombatMenu(character) {
  console.log(" ");
  console.log("╔══════════════╗");
  console.log("║      ⚔️      ║");
  console.log("║ 1. Attack    ║");
  console.log("║ 2. Defence   ║");
  console.log("║ 3. Use Item  ║");
  console.log("║ 4. Flee      ║");
  console.log("╚══════════════╝");
  console.log(" ");
  const actionc = readlineSync.question("Select an option: ");
  console.log(" ");
  return actionc; // Asegúrate de que esta línea esté dentro del cuerpo de la función
}
export function drawStatistics(character) {
  console.clear();
  drawCharacterInfo(character);
  console.log(" ");
  console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
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
