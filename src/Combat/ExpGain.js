export function gainExperience(player, enemyExperience) {
  player.baseExp += enemyExperience.baseExpAmount;
  player.jobExp += enemyExperience.jobExpAmount;
  console.log(`${player.name} ganó ${enemyExperience.baseExpAmount} EXP base!`);
  console.log(
    `${player.name} ganó ${enemyExperience.jobExpAmount} EXP de trabajo!`
  );
  //   this.levelUp();
}
