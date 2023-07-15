import Character from "./src/Entities/Character.js";
import Game from "./src/game.js";
import Inventory from "./src/Items/Inventary.js";

console.clear();
console.log("Bienvenido a Ragnarok!");

let name = "Player";

let attackType = "physical";
let str = 7;
let agi = 2;
let vit = 4;
let int = 0;
let dex = 3;
let luk = 2;

let character = new Character(name, str, agi, vit, int, dex, luk, attackType);
let inventory = new Inventory();
let game = new Game(character, inventory);

game.run();
