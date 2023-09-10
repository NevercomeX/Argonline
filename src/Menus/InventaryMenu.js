import readlineSync from "readline-sync";

import { getInventory, getItemNameById } from "../Controllers/index.js";
import { drawCharacterInfo } from "./Bars/CharacterBar.js";

export async function InventaryMenu(id) {
  console.clear();
  await drawCharacterInfo(id);
  const lineLength = 10; // Define la longitud de la línea
  const inventory = await getInventory(id);

  console.log(" ");
  //list of all the items in the inventory
  console.log("╔══════ INVENTORY  ══════╗");
  for (let i = 0; i < inventory.length; i++) {
    const item = await getItemNameById(inventory[i].itemId);
    console.log(
      `║ ${item} x ${inventory[i].quantity}`.padEnd(lineLength - 1) + "║"
    );
  }
  console.log("╚══════ Items: " + inventory.length + " ═══════╝");
  console.log(" ");
  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}
