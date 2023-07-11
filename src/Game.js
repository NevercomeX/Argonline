import {
  drawMainMenu,
  drawStatistics,
  drawEnemyBar,
  drawCharacterInfo,
} from "./drawer.js";

import generateEnemy from "./generateEnemy.js";
import Battle from "./Combat.js";

import readlineSync from "readline-sync";

// Ejemplo de uso

class Game {
  constructor(character, inventory) {
    this.character = character;
    this.inventory = inventory;
  }

  run() {
    let quit = false;
    while (!quit) {
      const option = this.showMainMenu();
      switch (option) {
        case "1":
          this.startCombat();
          break;
        case "2":
          this.showStatsMenu();
          break;
        case "3":
          this.showEquipmentMenu();
          break;
        case "4":
          this.showInventory();
          break;
        case "5":
          this.showOptionsMenu();
          break;

        case "7":
          console.log("Hasta pronto!");
          quit = true;
          break;
        default:
          console.log("Opcion inválida, por favor intenta de nuevo.");
          break;
      }
    }
  }
  showMainMenu() {
    return drawMainMenu(this.character);
  }

  showStatsMenu() {
    drawStatistics(this.character);
    console.log("Presiona cualquier tecla para volver al menu principal.");
    readlineSync.question("");
  }

  showEquipmentMenu() {
    console.log("\n--- EQUIPAMIENTO ---");
    this.character.showEquipment();
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
  }

  showInventory() {
    console.log("\n--- INVENTARIO ---");
    this.character.inventory.listItems();
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
  }

  showOptionsMenu() {
    console.log("\n--- OPCIONES ---");
    // Aquí puedes agregar la lógica para mostrar las opciones del juego
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
  }
  startCombat() {
    console.clear();
    let continueFighting = true;
    while (continueFighting && this.character.health > 0) {
      let enemy = generateEnemy();
      console.log(`A wild ${enemy.name} has appeared!`);
      const battle = new Battle(this.character, enemy);

      drawCharacterInfo(this.character);
      console.log(" ");
      console.log("⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️🔥 VS 🔥⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️⛓️");
      console.log(" ");
      drawEnemyBar(enemy);

      battle.start();

      if (this.character.health > 0) {
        console.log("Has derrotado al enemigo. ¿Deseas continuar luchando?");
        const answer = readlineSync.question("Si / No: ");
        continueFighting = answer.toLowerCase() === "si";
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

  // generateEnemy() {
  //   // Aquí puedes generar un nuevo enemigo. Por ahora, solo devolveremos un enemigo básico.
  //   return new Character("Enemigo", 100, 10);
  // }
  // ...
}

export default Game;
