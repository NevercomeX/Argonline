import Character from "./src/Character.js";
import Game from "./src/game.js";
import readlineSync from "readline-sync";
import Inventory from "./src/Items/Inventary.js";

function allocateStats() {
  const maxPoints = 5;
  let remainingPoints = maxPoints;
  const stats = ["str", "agi", "vit", "int", "dex", "luk"];
  const allocatedStats = {};

  console.log(
    `Tienes ${maxPoints} puntos para distribuir entre las siguientes estadísticas: STR, AGI, VIT, INT, DEX, LUK.`
  );

  for (let i = 0; i < stats.length; i++) {
    console.log(`\nQuedan ${remainingPoints} puntos.`);

    let allocation = readlineSync.questionInt(
      `Cuantos puntos quieres asignar a ${stats[i].toUpperCase()}? `
    );

    while (allocation > remainingPoints) {
      console.log(
        `No puedes asignar más puntos de los que tienes. Actualmente tienes ${remainingPoints} puntos.`
      );
      allocation = readlineSync.questionInt(
        `Cuantos puntos quieres asignar a ${stats[i].toUpperCase()}? `
      );
    }

    remainingPoints -= allocation;
    allocatedStats[stats[i]] = allocation;
  }

  return allocatedStats;
}
console.clear();
console.log("Bienvenido a Ragnarok!");
let name = readlineSync.question("Ingresa el nombre de tu personaje: ");
// let { str, agi, vit, int, dex, luk } = allocateStats();

let str = 7;
let agi = 2;
let vit = 4;
let int = 0;
let dex = 3;
let luk = 2;

let character = new Character(name, str, agi, vit, int, dex, luk);
let inventory = new Inventory();
let game = new Game(character, inventory);

game.run();
