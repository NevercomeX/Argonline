import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getEquipmentSlotsByCharacterId,
  getItemNameById,
  unequipItem,
} from "../Controllers/index.js";

const lineLength = 35;

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
// const GREEN = '\x1b[32m';
const YELLOW = "\x1b[33m";
// const BLUE = '\x1b[34m';
// const MAGENTA = '\x1b[35m';
// const CYAN = '\x1b[36m';
// const WHITE = '\x1b[37m';

const slotStatus = {
  empty: `${RED}Empty${RESET}`,
  unequippable: "Unequippable",
  locked: "Locked",
  disabled: "Disabled",
  hidden: "Hidden",
};

const equipmentSlots = {
  upperHeadSlot: "Upper Head",
  midHeadSlot: "Mid Head",
  lowerHeadSlot: "Lower Head",
  bodySlot: "Body",
  rightHandSlot: "Right Hand",
  leftHandSlot: "Left Hand",
  robeSlot: "Robe",
  shoesSlot: "Shoes",
  accessorySlot01: "Accessory 1",
  accessorySlot02: "Accessory 2",
  ammoSlot: "Ammo",
};

async function getItemNames(itemIds) {
  const itemNamesMap = new Map();
  for (const itemId of itemIds) {
    if (!itemId) {
      console.error("getItemNames: Encontrado itemId nulo o indefinido.");
      itemNamesMap.set(itemId, "Unknown Item");
      continue; // Saltar itemIds inválidos
    }
    const itemName = await getItemNameById(itemId);
    itemNamesMap.set(itemId, itemName);
  }
  return itemNamesMap;
}

function createSlotObject(slotName, displayName, itemId, itemName) {
  let description = slotStatus.empty;
  let displayItem = slotStatus.empty;

  if (itemName && itemName !== "Unknown Item") {
    displayItem = itemName;
    description = itemName;
  } else if (!itemId || itemName === "Unknown Item") {
    displayItem = slotStatus.empty;
    description = slotStatus.empty;
  } else {
    switch (itemId) {
      case 0:
        displayItem = slotStatus.unequippable;
        description = slotStatus.unequippable;
        break;
      case -1:
        displayItem = slotStatus.locked;
        description = slotStatus.locked;
        break;
      case -2:
        displayItem = slotStatus.disabled;
        description = slotStatus.disabled;
        break;
      case -3:
        displayItem = slotStatus.hidden;
        description = slotStatus.hidden;
        break;
      default:
        displayItem = "Unknown Item";
        description = "Unknown Item";
        break;
    }
  }

  return {
    name:
      `║ ${displayName}: [ ${YELLOW}${displayItem}${RESET} ]`.padEnd(
        lineLength - 1,
      ) + "║",
    value: slotName,
    description: description,
  };
}

export async function EquipmentMenu(id) {
  const equipmentSlotsData = await getEquipmentSlotsByCharacterId(id);
  console.log("slots de items", equipmentSlotsData);

  // Obtener todos los IDs de ítems equipados, ignorando el characterId
  const itemIds = Object.keys(equipmentSlots).reduce((acc, slotName) => {
    const itemId = equipmentSlotsData[0][slotName];
    if (itemId != null && typeof itemId === "number") {
      acc.push(itemId);
    }
    return acc;
  }, []);

  console.log("itemIds equipados", itemIds);

  // Obtener nombres de los ítems, manejando ítems normales e instanciados
  const itemNamesMap = await getItemNames(itemIds);
  console.log("Mapa de nombres de ítems", itemNamesMap);

  // Crear un array de objetos para cada slot
  const equipmentSlotsArray = Object.keys(equipmentSlots).map((slotName) => {
    const displayName = equipmentSlots[slotName];
    const itemId = equipmentSlotsData[0][slotName];
    const itemName = itemNamesMap.get(itemId);

    console.log(slotName, displayName, itemId, itemName);
    return createSlotObject(slotName, displayName, itemId, itemName);
  });

  const answer = await select({
    message: "Which item do you want to unequip?",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(lineLength) + "╗"),
      ...equipmentSlotsArray,
      new Separator(" ╚" + "═".repeat(lineLength) + "╝"),
      new Separator(" "),
      { name: "Go back", value: "goBack" },
    ],
    pageSize: 16,
  });

  if (answer === "goBack") {
    return;
  }

  // Aquí no necesitas usar 'find', ya que 'answer' contiene el nombre del slot directamente.
  const selectedSlot = equipmentSlotsData[0][answer]; // Accedemos directamente al slot correspondiente
  const itemId = selectedSlot;
  const itemName = itemNamesMap.get(itemId);

  if (itemId === null || itemId === undefined) {
    console.log("This slot is empty!");
  } else if (itemId === 0) {
    console.log("You can't unequip this item!");
  } else if (itemId === -1) {
    console.log("This slot is locked!");
  } else {
    await unequipItem(id, answer);
    console.log(`You unequipped ${itemName}!`);
  }

  readlineSync.question("Press any key to return to the main menu.");
}
