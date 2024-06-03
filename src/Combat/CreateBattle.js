import { drawCharacterInfo } from "../Menus/Bars/CharacterBar.js";
import { drawEnemyBar } from "../Menus/Bars/EnemyBar.js";
import { attackPlayer, attackEnemy } from "./Actions/Attack.js";
import { gainExperience } from "./Actions/ExpGain.js";
import { drawCombatMenu } from "../Menus/CombatMenu.js";

import readlineSync from "readline-sync";

async function createBattle(player, enemy) {

  start();

  let messages = [];

  function addMessage(message) {
    messages.push(message);
  }

  function printMessages() {
    messages.forEach((message) => console.log(message));
    messages = [];
  }

  function drawBattleScene() {
    console.clear();
    drawCharacterInfo(player);
    console.log(" ");
    console.log(
      "⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️"
    );
    console.log(" ");
    drawEnemyBar(enemy);
  }

  async function playerTurn() {
    let validAction = false;
    while (!validAction) {
      const action = await drawCombatMenu(player);
      switch (action) {
        case 1:
          handlePlayerAttack();
          validAction = true;
          break;
        case 2:
          handlePlayerDefend();
          validAction = true;
          break;
        case 3:
          handlePlayerUseItem();
          validAction = true;
          break;
        case 4:
          handlePlayerRunAway();
          validAction = true;
          break;
        default:
          console.log("Invalid action. Please try again.");
          break;
      }
    }
    endTurn("player");
  }

  function handlePlayerAttack() {
    const damageMade = attackPlayer(player, enemy);
    addMessage(
      `${player.name} ataca a ${enemy.name} por ${damageMade} de daño.`
    );
    printMessages();
  }

  function handlePlayerDefend() {
    player.defend(enemy);
    addMessage(`${player.name} se defiende.`);
    printMessages();
  }

  function handlePlayerUseItem() {
    player.useItem();
    addMessage(`${player.name} usa un objeto.`);
    printMessages();
  }

  function handlePlayerRunAway() {
    player.runAway();
    addMessage(`${player.name} huye del combate.`);
    printMessages();
  }

  function enemyTurn() {
    if (player.health > 0) {
      try {
        drawEnemyBar(enemy);
        const damageMade = attackEnemy(player, enemy);
        console.log(" ");
        addMessage(
          `${enemy.name} ataca a ${player.name} por ${damageMade} de daño.`
        );
        printMessages();
      } catch (error) {
        console.error(`Error during enemy attack: ${error}`);
      }
    }
    endTurn("enemy");
  }

  function endTurn(turn) {
    if (player.health <= 0) {
      console.log("Enemy wins!");
      player.death();
    } else if (enemy.health <= 0) {
      console.log("Player wins!");
      gainExperience(player, enemy);
    } else {
      if (turn === "player") {
        enemyTurn();
      } else {
        playerTurn();
      }
    }
  }

  async function start() {
    drawBattleScene();
    await playerTurn();
  }

  return { start };
}

export default createBattle;
