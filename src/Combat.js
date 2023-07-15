import { drawCombatMenu, drawCharacterInfo, drawEnemyBar } from "./drawer.js";
import { EventEmitter } from "events";

class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.playerTurnHandler = this.playerTurn.bind(this);
    this.enemyTurnHandler = this.enemyTurn.bind(this);
    this.endTurnHandler = this.endTurn.bind(this);
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  printMessages() {
    for (let message of this.messages) {
      console.log(message);
    }
    this.messages = []; // Limpiamos los mensajes después de imprimirlos
  }

  drawBattleScene() {
    drawCharacterInfo(this.player);
    console.log(" ");
    console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️ 🔥 VS 🔥 ⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
    console.log(" ");
    drawEnemyBar(this.enemy);
  }

  start() {
    this.drawBattleScene();
    this.playerTurn();
  }

  clear() {
    console.clear();
  }

  playerTurn() {
    const action = drawCombatMenu(this.player);
    switch (action) {
      case "1":
        console.clear();
        drawCharacterInfo(this.player);
        this.player.attack(this.enemy);
        let damage = this.player.attackPower - this.enemy.defense;
        this.addMessage(
          `${this.player.name} ataca a ${this.enemy.name} por ${damage} de daño.`
        );
        this.printMessages();
        break;
      case "2":
        this.player.defend(this.enemy);
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
    this.endTurn("player");
  }

  enemyTurn() {
    if (this.player.health > 0) {
      try {
        this.enemy.attack(this.player);
        drawEnemyBar(this.enemy);
        let damage = this.enemy.attackPower - this.enemy.defense;
        console.log(" ");
        this.addMessage(
          `${this.enemy.name} ataca a ${this.enemy.name} por ${damage} de daño.`
        );
        this.printMessages();
      } catch (error) {
        console.error(`Error during enemy attack: ${error}`);
      }
    }

    this.endTurn("enemy");
  }

  endTurn(turn) {
    if (this.player.health <= 0) {
      console.log("Enemy wins!");
      this.player.death();
      // Handle end of battle...
    } else if (this.enemy.health <= 0) {
      console.log("Player wins!");
      this.player.gainExperience(this.enemy);
      // Handle end of battle...
    } else {
      // If neither player nor enemy has lost, start the next turn
      if (turn === "player") {
        this.enemyTurnHandler();
      } else {
        this.playerTurnHandler();
      }
    }
  }
}

export default Battle;
