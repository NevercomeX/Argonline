import { PrismaClient } from "@prisma/client";
import { drawCharacterInfo } from "../Menus/Bars/CharacterBar.js";
import { drawEnemyBar } from "../Menus/Bars/EnemyBar.js";
import { attackPlayer, attackEnemy } from "./Actions/Attack.js";
import { gainExperience } from "./Actions/ExpGain.js";
import { CombatMenu } from "../Menus/CombatMenu.js";
import { getCharacter, updateCharacter } from "../Controllers/character.js"; 
import { EventEmitter } from 'events';

const prisma = new PrismaClient();
EventEmitter.defaultMaxListeners = 20;

async function createBattle(player, enemy) {
  await start(player, enemy);
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
    console.log(messages.join('\n'));
    messages = [];
  }
}

async function drawBattleScene(player, enemy) {
  console.clear();
  await drawCharacterInfo(player);
  console.log(" ");
  console.log(
    "⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️"
  );
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
}

function handlePlayerDefend(player, enemy) {
  player.defend(enemy);
  addMessage(`${player.name} se defiende.`);
  printMessages();
}

function handlePlayerUseItem(player, enemy) {
  player.useItem();
  addMessage(`${player.name} usa un objeto.`);
  printMessages();
}

function handlePlayerRunAway(player, enemy) {
  player.runAway();
  addMessage(`${player.name} huye del combate.`);
  printMessages();
}

async function enemyTurn(player, enemy) {
  if (player.health > 0) {
    try {
      await drawEnemyBar(enemy);
      const damageMade = await attackEnemy(player, enemy);
      addMessage(`${enemy.name} ataca a ${player.name} por ${damageMade} de daño.`);
      printMessages();

      // Actualizar el estado del jugador en la base de datos
      await updateCharacter(player.id, { health: player.health });
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
    console.log("Enemy wins!");
    player.death();
  } else if (enemy.health <= 0) {
    console.log("Player wins!");
    await gainExperience(player, enemy);

    // Actualizar el estado del jugador en la base de datos al final de la batalla
    await updateCharacter(player.id, {
      experience: player.experience,
      level: player.level,
      health: player.health
    });
  }
}

export default createBattle;
