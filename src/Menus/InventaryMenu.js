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

  const inventory = await getInventory(id);
  const inventoryItems = [];
  for (let i = 0; i < inventory.length; i++) {
    const item = await getItemNameById(inventory[i].itemId);
    const itemEquipable = await getItemsById(inventory[i].itemId);
    inventoryItems.push({
      name:
        `║ ${item} x ${inventory[i].quantity} ${itemEquipable.equipable}`.padEnd(
          36,
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
      { name: "Go back", value: "goBack" },
    ],
    pageSize: 100,
    loop: true,
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

  const itemEquipable = await getItemsById(inventoryMenu);
  if (itemEquipable.equipable === true) {
    // Verificar si ya hay un ítem equipado en ese slot
    const equipment = await getEquipmentByCharacterIdAndSlot(
      id,
      itemEquipable.equipmentSlot,
    );
    
    if (equipment) {
      console.log(`Desequipando ítem del slot: ${itemEquipable.equipmentSlot}`);
      await unequipItem(id, itemEquipable.equipmentSlot);
    }

    // Equipar el nuevo ítem
    await equipItem(id, itemEquipable.equipmentSlot, inventoryMenu);
    console.log(`Ítem equipado: ${itemEquipable.name}`);
  } else {
    console.log("Este ítem no es equipable!");
  }

  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal.",
  );
}

