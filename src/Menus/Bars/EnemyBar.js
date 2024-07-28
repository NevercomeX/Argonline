import { drawEnemyHealthBar } from "./helpers/Bars.js";

export async function drawEnemyBar(enemy) {
  const lineLength = 100;
  console.log("╔" + "═".repeat(lineLength - 2) + "╗");
  console.log(
    `║ Name: ${enemy.name} | Level: ${enemy.baseLevel} | Type: ${enemy.monsterType}`.padEnd(
      lineLength - 1
    ) + "║"
  );
  drawEnemyHealthBar(enemy.health, enemy.maxHealth);
  console.log(
    `║ Reward Base EXP: ${enemy.giveBaseExpAmount} | Reward Job EXP: ${enemy.giveJobExpAmount}`.padEnd(
      lineLength - 1
    ) + "║"
  );
  console.log("╚" + "═".repeat(lineLength - 2) + "╝");
}
