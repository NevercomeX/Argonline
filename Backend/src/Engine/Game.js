import {
  MainMenu,
  StatsMenu,
  EquipmentMenu,
  InventaryMenu,
} from "./Menus/index.js";

import createBattle from "./Combat/CreateBattle.js";

export async function runGame(character, enemy) {
  const characterId = character;
  let quit = false;
  while (!quit) {
    const option = await MainMenu(characterId);
    switch (option) {
      case 1:
        await createBattle(character, enemy);
        break;
      case 2:
        await StatsMenu(characterId);
        break;
      case 3:
        await EquipmentMenu(characterId);
        break;
      case 4:
        await InventaryMenu(characterId);
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
  if (character.health <= 0) {
    console.log("Player has died. Resetting the database...");
  }
}
