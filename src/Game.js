import {
  drawExperienceBar,
  drawJobExperienceBar,
  drawHealthBar,
  drawManaBar,
} from "./Bars.js";

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

  showExperienceBar() {
    drawExperienceBar(this.character.exp, this.character.maxExp);
    drawJobExperienceBar(this.character.jobExp, this.character.maxJobExp);
  }

  showHealthBar() {
    drawHealthBar(this.character.health, this.character.maxHealth);
    drawManaBar(this.character.mana, this.character.maxMana);
  }

  mainBars() {
    this.showHealthBar();
    this.showExperienceBar();
  }

  showMainMenu() {
    console.clear();
    this.mainBars();
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1. Combate");
    console.log("2. Ver estadisticas");
    console.log("3. Administrar equipamiento");
    console.log("4. Ver inventario");
    console.log("5. Opciones");
    console.log("6. Salir del juego");
    const option = readlineSync.question("Selecciona una opcion: ");
    return option;
  }

  showStatsMenu() {
    console.log("\n--- ESTADÍSTICAS ---");
    this.character.showStats();
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
    let continueFighting = true;
    while (continueFighting && this.character.health > 0) {
      const enemy = this.generateEnemy(); // Genera un nuevo enemigo
      const battle = new Battle(this.character, enemy);
      battle.start();

      if (this.character.health > 0) {
        console.log("Has derrotado al enemigo. ¿Deseas continuar luchando?");
        const answer = readlineSync.question("Sí / No: ");
        continueFighting = answer.toLowerCase() === "sí";
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

  generateEnemy() {
    // Aquí puedes generar un nuevo enemigo. Por ahora, solo devolveremos un enemigo básico.
    return new Character("Enemigo", 100, 10);
  }
  // ...
}

export default Game;
