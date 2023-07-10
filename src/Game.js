// src/Game.js

class Game {
  constructor(character) {
    this.character = character;
  }

  run() {
    let quit = false;
    while (!quit) {
      const option = this.showMainMenu();
      switch (option) {
        case "1":
          this.showStatsMenu();
          break;
        case "2":
          this.showEquipmentMenu();
          break;
        case "3":
          this.showOptionsMenu();
          break;
        case "4":
          console.log("Hasta pronto!");
          quit = true;
          break;
        default:
          console.log("Opción inválida, por favor intenta de nuevo.");
          break;
      }
    }
  }

  showMainMenu() {
    const readlineSync = require("readline-sync");
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1. Ver estadísticas");
    console.log("2. Administrar equipamiento");
    console.log("3. Opciones");
    console.log("4. Salir del juego");
    const option = readlineSync.question("Selecciona una opción: ");
    return option;
  }

  showStatsMenu() {
    console.log("\n--- ESTADÍSTICAS ---");
    this.character.showStats();
    console.log("Presiona cualquier tecla para volver al menú principal.");
    const readlineSync = require("readline-sync");
    readlineSync.question("");
  }

  showEquipmentMenu() {
    console.log("\n--- EQUIPAMIENTO ---");
    // Aquí puedes agregar la lógica para mostrar las opciones de equipamiento
    const readlineSync = require("readline-sync");
    readlineSync.question(
      "Presiona cualquier tecla para volver al menú principal."
    );
  }

  showOptionsMenu() {
    console.log("\n--- OPCIONES ---");
    // Aquí puedes agregar la lógica para mostrar las opciones del juego
    const readlineSync = require("readline-sync");
    readlineSync.question(
      "Presiona cualquier tecla para volver al menú principal."
    );
  }
}

export default Game;
