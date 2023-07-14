import { drawCombatMenu, drawCharacterInfo, drawEnemyBar } from "./drawer.js";

export default class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
  }

  start() {
    while (this.player.health > 0 && this.enemy.health > 0) {
      this.playerTurn();
      drawCharacterInfo(this.player);
      console.log(" ");
      console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
      console.log(" ");
      drawEnemyBar(this.enemy);
      if (this.enemy.health > 0) {
        this.enemyTurn();
      }
    }

    if (this.player.health > 0) {
      console.log("Player wins!");
      this.player.gainExperience(this.enemy);
    } else {
      console.log("Enemy wins!");
    }
  }

  playerTurn() {
    const action = drawCombatMenu(this.player);

    switch (action) {
      case "1":
        this.player.attack(this.enemy);
        break;
      case "2":
        character.isDefending = true;
        break;
      case "3":
        this.player.useItem();
        break;
      case "4":
        this.player.runAway();
        break;
      default:
        console.log("Invalid action. Please try again.");
        this.playerTurn(); // Recursively call playerTurn if the action was invalid
        break;
    }
  }

  enemyTurn() {
    console.log(`${this.enemy.name} attacks!`);
    this.enemy.attack(this.player);
  }
}
