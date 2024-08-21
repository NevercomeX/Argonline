import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getInventory,
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
    let equipable = false;
    let equipmentSlot = null;

    if (inventory[i].itemInstanceId) {
      // El ítem tiene una instancia asociada
      const itemInstance = inventory[i].itemInstance;
      itemName = itemInstance.itemTemplate.name;
      equipable = itemInstance.itemTemplate.equipable;
      equipmentSlot = itemInstance.itemTemplate.equipmentSlot;
    } else {
      // El ítem es un ítem regular, no tiene instancia
      const item = inventory[i].item;
      itemName = item.name;
      equipable = item.equipable;
      equipmentSlot = item.equipmentSlot;
    }

    inventoryItems.push({
      name: `║ ${itemName} x ${inventory[i].quantity} ${equipable ? "(Equipable)" : ""}`.padEnd(36) + "║",
      value: {
        id: inventory[i].itemInstanceId ? inventory[i].itemInstanceId : inventory[i].itemId,
        equipable: equipable,
        equipmentSlot: equipmentSlot,
        isInstance: !!inventory[i].itemInstanceId, // Indica si es una instancia
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

  if (inventoryMenu === undefined || inventoryMenu === "goBack") {
    return;
  }

  const selectedItem = inventoryMenu;

  console.log("Selected item:", selectedItem); // Depuración

  // Verificar si es un ítem equipable
  if (selectedItem && selectedItem.equipable) {
    let equipmentSlot = selectedItem.equipmentSlot;
    let itemIdToEquip = selectedItem.id;

    
    const currentEquipment = await getEquipmentSlotByCharacterIdAndSlot(id, equipmentSlot);

    if (currentEquipment) {
      console.log(`Desequipando ítem del slot: ${equipmentSlot}`);
      await unequipItem(id, equipmentSlot);
    }
    
    if (selectedItem.isInstance) {
      // Si el ítem es una instancia
      const  selectedItemInstance = await getItemInstanceById(selectedItem.id);

      if (!selectedItemInstance) {
        console.log("Este ítem no tiene una instancia válida.");
        return;
      }

      if (!selectedItemInstance.equipmentSlot) {
        // Determinar slot si no está asignado en la instancia
        selectedItemInstance.equipmentSlot = determineEquipmentSlot(selectedItemInstance.itemTemplate.itemSubType);
        console.log(`Slot determinado para equipar: ${selectedItemInstance.equipmentSlot}`);
      }

      await equipItem(id, selectedItemInstance.equipmentSlot, selectedItemInstance.id);
      console.log(`Ítem equipado: ${selectedItemInstance.itemTemplate.name}`);

    } else {
      // Si el ítem es un ítem regular
      await equipItem(id, equipmentSlot, itemIdToEquip);
    }
  } else {
    console.log("Este ítem no es equipable!");
  }

  readlineSync.question("Presiona cualquier tecla para volver al menú principal.");
}

function determineEquipmentSlot(itemSubType) {
  // Aquí, dependiendo de tu modelo de datos y lógica, podrías mapear itemTypes a slots específicos
  const slotMap = {
    "rightHandSlot": "rightHandSlot",
    "upperHeadSlot": "upperHeadSlot",
    "leftHandSlot": "leftHandSlot",
    "bodySlot": "bodySlot",
    "shoesSlot": "shoesSlot",
    "accessorySlot01": "accessorySlot01", 
    "accessorySlot02": "accessorySlot02",
    "ammoSlot": "ammoSlot",
    "midHeadSlot": "midHeadSlot",
    "lowerHeadSlot": "lowerHeadSlot",
    "robeSlot": "robeSlot",
  };

  return slotMap[itemSubType] || null;
}