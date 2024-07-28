import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getInventory,
  getItemNameById,
  getItemsById,
  getEquipmentByCharacterIdAndSlot,
  unequipItem,
  equipItem,
} from "../Controllers/index.js";
import { drawCharacterInfo } from "./Bars/CharacterBar.js";

export async function InventaryMenu(id) {
  console.clear();
  await drawCharacterInfo(id);

  // use the inquirer select to show the inventory and equip items from there by it equipable bollean value
  const inventory = await getInventory(id);
  const inventoryItems = [];
  for (let i = 0; i < inventory.length; i++) {
    const item = await getItemNameById(inventory[i].itemId);
    const itemEquipable = await getItemsById(inventory[i].itemId);
    inventoryItems.push({
      name:
        `║ ${item} x ${inventory[i].quantity} ${itemEquipable.equipable}`.padEnd(
          36
        ) + "║",
      value: inventory[i].itemId,
    });
  }

  const inventoryMenu = await select({
    message: "Select an item to use or press ESC to go back.",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(35) + "╗"),
      ...inventoryItems,
      new Separator(" ╚" + "═".repeat(35) + "╝"),
      new Separator(" "),
      { name: "Go back", value: "goBack"}
    ],
    pageSize: 100,
    loop: false,
    separator: "",
    filter: function (val) {
      return val.toLowerCase();
    },
  });

  if (inventoryMenu === "goBack") {
    return;
  }

  if (inventoryMenu === undefined) {
    return;
  }

  //equip item if it is equipable and if it is not, show a message
  const itemEquipable = await getItemsById(inventoryMenu);
  if (itemEquipable.equipable === true) {
    const equipment = await getEquipmentByCharacterIdAndSlot(
      id,
      itemEquipable.equipmentSlot
    );
    if (equipment === null) {
      await equipItem(id, itemEquipable.equipmentSlot, inventoryMenu);
      await removeItemFromInventory(id, inventoryMenu);
    } else {
      await unequipItem(id, itemEquipable.equipmentSlot);
      await equipItem(id, itemEquipable.equipmentSlot, inventoryMenu);
      await removeItemFromInventory(id, inventoryMenu);
    }
  } else {
    console.log("This item is not equipable!");
  }

  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}
