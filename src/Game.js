import { drawMainMenu, drawStatistics, drawCombatMenu } from "./drawer.js";
import { PrismaClient } from "@prisma/client";
import CreateBattle from "./CreateBattle.js";
import readlineSync from "readline-sync";

import select, { Separator } from "@inquirer/select";

const prisma = new PrismaClient();

let character;
let enemies;

async function test() {
  console.log(await drawMainMenu(character));
}

async function runGame() {
  let quit = false;
  const actions = {
    1: startCombat,
    2: showStatsMenu,
    3: showEquipmentMenu,
    4: showInventory,
    5: showOptionsMenu,
    7: () => {
      console.log("Hasta pronto!");
      quit = true;
    },
  };

  while (!quit) {
    const option = await drawMainMenu(character);
    const action = actions[option];

    if (action) {
      await action();
    } else {
      console.log("Opcion inválida, por favor intenta de nuevo.");
    }
  }
}
function showStatsMenu() {
  drawStatistics(character);
  console.log("Presiona cualquier tecla para volver al menu principal.");
  readlineSync.question("");
}

function showEquipmentMenu() {
  console.log("\n--- EQUIPAMIENTO ---");
  character.showEquipment();
  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}

function showInventory() {
  console.log("\n--- INVENTARIO ---");
  character.inventory.listItems();
  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}

function showOptionsMenu() {
  console.log("\n--- OPCIONES ---");
  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}

class CombatStateMachine {
  constructor(character, enemies) {
    this.character = character;
    this.enemies = enemies;
    this.continueFighting = true;
    this.currentEnemy = null;
  }

  async start() {
    console.clear();
    while (this.continueFighting && this.character.health > 0) {
      this.currentEnemy = this.selectEnemy();
      console.log(`A wild ${this.currentEnemy.name} has appeared!`);
      const battle = CreateBattle(this.character, this.currentEnemy);
      battle.start();

      if (this.character.health > 0) {
        const answer = await this.askContinueFighting();
        this.continueFighting = answer.toLowerCase() === "si";
      } else {
        console.log(
          "Has sido derrotado. Regresas al menú principal para recuperarte."
        );
        this.continueFighting = false;
      }
    }

    if (this.character.health <= 0) {
      console.log(
        "Has sido derrotado. Regresas al menú principal para recuperarte."
      );
    } else {
      console.log("Regresas al menú principal.");
    }
  }

  selectEnemy() {
    // Add more sophisticated algorithm to select enemies based on player's level or other factors
    const randomIndex = Math.floor(Math.random() * this.enemies.length);
    return this.enemies[randomIndex];
  }

  async askContinueFighting() {
    const answer = await select({
      message: "Has derrotado al enemigo. ¿Deseas continuar luchando?",
      choices: [
        {
          name: "Si",
          value: "si",
        },
        {
          name: "No",
          value: "No",
        },
      ],
    });
    return answer.continueFighting;
  }
}

async function startCombat() {
  const combatStateMachine = new CombatStateMachine(character, enemies);
  await combatStateMachine.start();
}

export async function startGame(player, enemyList) {
  character = player;
  enemies = enemyList;
  // await test();
  startCombat();
}
