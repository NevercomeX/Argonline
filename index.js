import Character from "./src/Character.js";
import Game from "./src/game.js";
import readlineSync from "readline-sync";

function allocateStats() {
  const maxPoints = 100;
  let remainingPoints = maxPoints;
  const stats = ["str", "agi", "vit", "int", "dex", "luk"];
  const allocatedStats = {};

  console.log(
    `Tienes ${maxPoints} puntos para distribuir entre las siguientes estadísticas: STR, AGI, VIT, INT, DEX, LUK.`
  );

  for (let i = 0; i < stats.length; i++) {
    console.log(`\nQuedan ${remainingPoints} puntos.`);

    let allocation = readlineSync.questionInt(
      `¿Cuántos puntos quieres asignar a ${stats[i].toUpperCase()}? `
    );

    while (allocation > remainingPoints) {
      console.log(
        `No puedes asignar más puntos de los que tienes. Actualmente tienes ${remainingPoints} puntos.`
      );
      allocation = readlineSync.questionInt(
        `¿Cuántos puntos quieres asignar a ${stats[i].toUpperCase()}? `
      );
    }

    remainingPoints -= allocation;
    allocatedStats[stats[i]] = allocation;
  }

  return allocatedStats;
}

console.log("Bienvenido a Ragnarok!");
let name = readlineSync.question("Ingresa el nombre de tu personaje: ");
let { str, agi, vit, int, dex, luk } = allocateStats();

let character = new Character(name, str, agi, vit, int, dex, luk);
let game = new Game(character);
game.run();
