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

    if (inventory[i].itemInstance) {
      const itemInstance = inventory[i].itemInstance;
      itemName = itemInstance.itemTemplate.name;
      equipable = itemInstance.itemTemplate.equipable;

      // Determina el slot de equipamiento
      equipmentSlot = determineEquipmentSlot(itemInstance.itemTemplate.itemType);
    } else {
      const item = inventory[i].item;
      itemName = item.name;
      equipable = item.equipable;

      // Determina el slot de equipamiento
      equipmentSlot = determineEquipmentSlot(item.itemType);
    }

    inventoryItems.push({
      name: `║ ${itemName} x ${inventory[i].quantity} ${equipable ? "(Equipable)" : ""}`.padEnd(36) + "║",
      value: {
        id: inventory[i].itemInstanceId ? inventory[i].itemInstanceId : inventory[i].itemId,
        equipable: equipable,
        equipmentSlot: equipmentSlot,
      },
    });
  }

  console.log(inventoryItems);

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
  console.log("Selected item:", selectedItem); // Depuración
  if (selectedItem && selectedItem.equipable) {
    console.log("Este ítem es equipable."); // Depuración

    const selectedItemInstance = await getItemInstanceById(selectedItem.id);
    console.log("Selected item instance:", selectedItemInstance); // Depuración

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
    console.log("Este ítem no es equipable!"); // Depuración
  }

  readlineSync.question("Presiona cualquier tecla para volver al menú principal.");
}



// model EquipmentSlot {
//   id              Int       @id @default(autoincrement())
//   characterId     Int
//   upperHeadSlot   Int?
//   midHeadSlot     Int?
//   lowerHeadSlot   Int?
//   bodySlot        Int?
//   rightHandSlot   Int?
//   leftHandSlot    Int?
//   robeSlot        Int?
//   shoesSlot       Int?
//   accessorySlot01 Int?
//   accessorySlot02 Int?
//   ammoSlot        Int?
//   character       Character @relation(fields: [characterId], references: [id])
// }

function determineEquipmentSlot(itemType) {
  // Aquí, dependiendo de tu modelo de datos y lógica, podrías mapear itemTypes a slots específicos
  const slotMap = {
    "Weapon": "rightHandSlot",
    "Helmet": "upperHeadSlot",
    "Shield": "leftHandSlot",
    "Armor": "bodySlot",
    "Boots": "shoesSlot",
    "Accessory": "accessorySlot01", 
    "Ring": "accessorySlot02",
    "Ammo": "ammoSlot",
    "midHeadSlot": "midHeadSlot",
    "lowerHeadSlot": "lowerHeadSlot",
    "robeSlot": "robeSlot",
    "ammoSlot": "ammoSlot",
  };

  return slotMap[itemType] || null;
}