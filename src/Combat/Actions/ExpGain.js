import { updateCharacter } from "../../Controllers/character.js";

export async function gainExperience(player, enemyExperience) {
  player.baseExp += enemyExperience.giveBaseExpAmount;
  player.jobExp += enemyExperience.giveJobExpAmount;
  await updateExpGained(player.id, player.baseExp, player.jobExp);
  console.log(
    `${player.name} ganó ${enemyExperience.giveBaseExpAmount} EXP base!`,
  );
  console.log(
    `${player.name} ganó ${enemyExperience.giveJobExpAmount} EXP de trabajo!`,
  );
  //   this.levelUp();
}

export async function updateExpGained(playerId, newBaseExp, newJobExp) {
  const playerData = await updateCharacter(playerId, {
    baseExp: newBaseExp,
    jobExp: newJobExp,
  });
  return playerData;
}
