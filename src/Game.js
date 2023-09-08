import {
  drawMainMenu,
  drawStatistics,
  drawEquipment,
  drawInventory,
} from "./Drawer.js";
import CreateBattle from "./CreateBattle.js";

import select from "@inquirer/select";
import { getCharacter } from "./Controllers/index.js";

export async function runGame(id) {
  let quit = false;
  while (!quit) {
    const option = await drawMainMenu(await getCharacter(id));
    switch (option) {
      case 1:
        startCombat(id);
        break;
      case 2:
        await drawStatistics(id);
        break;
      case 3:
        await drawEquipment(id);
        break;
      case 4:
        await drawInventory(id);
        break;
      case 5:
        // showOptionsMenu();
        break;

      case 7:
        console.clear();
        console.log("Hasta pronto!");
        quit = true;
        break;
      default:
        console.log("Opcion inválida, por favor intenta de nuevo.");
        break;
    }
  }
}

export function startGame(character, enemies) {
  startCombat(character, enemies);
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
    await this.combatRound();
  }

  async combatRound() {
    if (!this.continueFighting || this.character.health <= 0) {
      if (this.character.health <= 0) {
        console.log(
          "Has sido derrotado. Regresas al menú principal para recuperarte."
        );
      } else {
        console.log("Regresas al menú principal.");
      }
      return;
    }

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
    await this.combatRound();
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

async function startCombat(character, enemies) {
  const combatStateMachine = new CombatStateMachine(character, enemies);

  await combatStateMachine.start();
}
