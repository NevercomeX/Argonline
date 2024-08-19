import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getInventory,
  getItemNameById,
  getItemInstanceById,
  getEquipmentSlotByCharacterIdAndSlot,
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
    let itemName;
    let itemInstance = null;

    // Primero, revisa si hay una instancia de ítem
    if (inventory[i].itemInstanceId) {
      try {
        itemInstance = await getItemInstanceById(inventory[i].itemInstanceId);
      } catch (error) {
        console.error(`Error al obtener la instancia de ítem: ${error.message}`);
        continue; // Saltar este ítem si la instancia no se encuentra
      }
    }

    // Si hay una instancia, usa el nombre del template. Si no, usa el nombre del ítem base
    if (itemInstance && itemInstance.itemTemplate) {
      itemName = itemInstance.itemTemplate.name;
    } else {
      itemName = await getItemNameById(inventory[i].itemId);
    }

    // Combina la información del ítem base y la instancia
    inventoryItems.push({
      name: `║ ${itemName} x ${inventory[i].quantity} ${itemInstance?.itemTemplate?.equipable ? "(Equipable)" : ""}`.padEnd(36) + "║",
      value: {
        id: itemInstance ? itemInstance.id : inventory[i].itemId,
        equipable: itemInstance?.itemTemplate?.equipable || false,
        equipmentSlot: itemInstance?.equipmentSlot || null,
      },
    });
  }

  if (inventoryItems.length === 0) {
    console.log("No hay ítems en tu inventario.");
    return;
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
  });

  if (inventoryMenu === undefined || inventoryMenu.value === "goBack") {
    return;
  }

  const selectedItem = inventoryMenu.value;

  // Verificar si es un ítem equipable
  if (selectedItem && selectedItem.equipable) {
    const selectedItemInstance = await getItemInstanceById(selectedItem.id);

    // Verificar que el ítem tiene un slot de equipamiento válido
    if (!selectedItemInstance || !selectedItemInstance.equipmentSlot) {
      console.log("Este ítem no puede ser equipado debido a la falta de un slot de equipamiento válido.");
      return;
    }

    const equipment = await getEquipmentSlotByCharacterIdAndSlot(
      id,
      selectedItemInstance.equipmentSlot
    );

    if (equipment) {
      console.log(`Desequipando ítem del slot: ${selectedItemInstance.equipmentSlot}`);
      await unequipItem(id, selectedItemInstance.equipmentSlot);
    }

    await equipItem(id, selectedItemInstance.equipmentSlot, selectedItemInstance.id);
    console.log(`Ítem equipado: ${selectedItemInstance.itemTemplate.name}`);
  } else {
    console.log("Este ítem no es equipable!");
  }

  readlineSync.question("Presiona cualquier tecla para volver al menú principal.");
}
