import { drawCharacterInfo } from "../Menus/Bars/CharacterBar.js";
import { drawEnemyBar } from "../Menus/Bars/EnemyBar.js";
import { attackPlayer, attackEnemy } from "./Actions/Attack.js";
import { gainExperience } from "./Actions/ExpGain.js";
import { CombatMenu } from "../Menus/CombatMenu.js";
import { getRandomEnemy } from "../Controllers/enemies.js";
import { getCharacterById, updateCharacter } from "../Controllers/character.js";
import { TypewriterEffect } from "../Menus/Bars/helpers/Typewriter.js";

async function createBattle(player) {
  let isBattleOngoing = true;

  while (isBattleOngoing) {
    let enemy = await getRandomEnemy();
    await start(player, enemy);

    isBattleOngoing = await askForRematch();
  }
}

async function start(player, enemy) {
  console.clear();
  await drawBattleScene(player, enemy);
  await mainLoop(player, enemy);
}

let messages = [];

function addMessage(message) {
  messages.push(message);
}

function printMessages() {
  if (messages.length > 0) {
    console.log(messages.join("\n"));
    messages = [];
  }
}

async function drawBattleScene(player, enemy) {
  console.clear();
  await drawCharacterInfo(player.id);
  console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
  console.log(" ");
  await drawEnemyBar(enemy);
}

async function playerTurn(player, enemy) {
  let validAction = false;
  while (!validAction) {
    const action = await CombatMenu(player);
    switch (action) {
      case 1:
        await handlePlayerAttack(player, enemy);
        validAction = true;
        break;
      case 2:
        handlePlayerDefend(player, enemy);
        validAction = true;
        break;
      case 3:
        handlePlayerUseItem(player, enemy);
        validAction = true;
        break;
      case 4:
        handlePlayerRunAway(player, enemy);
        validAction = true;
        break;
      default:
        console.log("Invalid action. Please try again.");
        break;
    }
  }
  await drawBattleScene(player, enemy);
}

async function handlePlayerAttack(player, enemy) {
  const damageMade = await attackPlayer(player, enemy);
  addMessage(`${player.name} ataca a ${enemy.name} por ${damageMade} de daño.`);
  printMessages();
  await drawCharacterInfo(player.id);
}

// async function handlePlayerDefend(player, enemy) {
//   player.defend(enemy);
//   addMessage(`${player.name} se defiende.`);
//   printMessages();
//   await drawCharacterInfo(player.id);
// }

// async function handlePlayerUseItem(player) {
//   player.useItem();
//   addMessage(`${player.name} usa un objeto.`);
//   printMessages();
//   await drawCharacterInfo(player.id);
// }

// async function handlePlayerRunAway(player) {
//   player.runAway();
//   addMessage(`${player.name} huye del combate.`);
//   printMessages();
//   await drawCharacterInfo(player.id);
// }

async function enemyTurn(player, enemy) {
  if (player.health > 0) {
    try {
      await drawEnemyBar(enemy);
      const damageMade = await attackEnemy(player, enemy);
      await TypewriterEffect(
        `${enemy.name} ataca a ${player.name} por ${damageMade} de daño.`,
        10,
      );
      printMessages();
    } catch (error) {
      console.error(`Error during enemy attack: ${error}`);
    }
  }
  await drawBattleScene(player, enemy);
}

async function mainLoop(player, enemy) {
  while (player.health > 0 && enemy.health > 0) {
    await playerTurn(player, enemy);
    if (enemy.health <= 0) break;
    await enemyTurn(player, enemy);
  }

  if (player.health <= 0) {
    await TypewriterEffect("¡El enemigo gana!\n", 50);
    player.death();
  } else if (enemy.health <= 0) {
    await TypewriterEffect("¡El jugador gana!\n", 50);
    await gainExperience(player, enemy);
    // Guarda el estado del jugador en la base de datos
    await updateCharacter(player.id, {
      health: player.health,
      // otros campos que necesiten actualizarse
    });
  }
}

async function askForRematch() {
  console.log("¿Quieres jugar otra vez? (s/n)");
  process.stdin.resume();
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      const answer = data.toString().trim().toLowerCase();
      process.stdin.pause();
      resolve(answer === "s");
    });
  });
}

export default createBattle;
