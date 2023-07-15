import { drawCombatMenu, drawCharacterInfo, drawEnemyBar } from "./drawer.js";
import { attackPlayer, attackEnemy } from "./Combat/Attack.js";
import { gainExperience } from "./Combat/ExpGain.js";

function createBattle(player, enemy) {
  let messages = [];

  function addMessage(message) {
    messages.push(message);
  }

  function printMessages() {
    for (let message of messages) {
      console.log(message);
    }
    messages = [];
  }

  function drawBattleScene() {
    drawCharacterInfo(player);
    console.log(" ");
    console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
    console.log(" ");
    drawEnemyBar(enemy);
  }

  async function playerTurn() {
    let validAction = false;
    while (!validAction) {
      const action = await drawCombatMenu(player);
      switch (action) {
        case "1":
          drawCharacterInfo(player);
          let damageMade = attackPlayer(player, enemy);
          addMessage(
            `${player.name} ataca a ${enemy.name} por ${damageMade} de daño.`
          );
          printMessages();
          validAction = true;
          break;
        case "2":
          player.defend(enemy);
          validAction = true;
          break;
        case "3":
          player.useItem();
          validAction = true;
          break;
        case "4":
          player.runAway();
          validAction = true;
          break;
        default:
          console.log("Invalid action. Please try again.");
          break;
      }
    }
    endTurn("player");
  }

  function enemyTurn() {
    if (player.health > 0) {
      try {
        drawEnemyBar(enemy);
        let damageMade = attackEnemy(player, enemy);
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

  function start() {
    drawBattleScene();
    playerTurn();
  }

  return { start };
}

export default createBattle;
