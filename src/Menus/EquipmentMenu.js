import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";
import {
  getEquipmentByCharacterId,
  addItemToInventory,
  getItemNameById,
  unequipItem,
} from "../Controllers/index.js";

const lineLength = 35; // The total length of the line
const slotStatus = {
  empty: "Empty",
  unequippable: "Unequippable",
  locked: "Locked",
  disabled: "Disabled",
  hidden: "Hidden",
};

const equipmentSlots = {
  upperHeadSlot: "Upper Head",
  midHeadSlot: "Mid Head ",
  lowerHeadSlot: "Lower Head ",
  bodySlot: "Body ",
  rightHandSlot: "Right Hand ",
  leftHandSlot: "Left Hand ",
  robeSlot: "Robe ",
  shoesSlot: "Shoes ",
  accessorySlot01: "Accessory  1",
  accessorySlot02: "Accessory  2",
  ammoSlot: "Ammo ",
};

async function getItemNames(itemIds) {
  const itemNamesMap = new Map();
  for (const itemId of itemIds) {
    const itemName = await getItemNameById(itemId);
    itemNamesMap.set(itemId, itemName);
  }
  return itemNamesMap;
}

function createSlotObject(slotName, displayName, itemId, itemName) {
  let description = slotStatus.empty;
  let displayItem = slotStatus.empty;

  if (itemName) {
    displayItem = itemName;
    description = itemName;
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
    }
  }

  return {
    name: `║ ${displayName}: [ ${displayItem} ]`.padEnd(lineLength - 1) + "║",
    value: slotName,
    description: description,
  };
}

export async function EquipmentMenu(id) {
  const equipmentData = await getEquipmentByCharacterId(id);
  const equipment = equipmentData[0];
  const itemIds = Object.values(equipment).filter((value) => value !== null);
  const itemNamesMap = await getItemNames(itemIds);

  const equipmentSlotsArray = Object.entries(equipmentSlots).map(
    ([slotName, displayName]) => {
      const itemId = equipment[slotName];
      const itemName = itemNamesMap.get(itemId);
      return createSlotObject(slotName, displayName, itemId, itemName);
    }
  );

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

  const itemId = equipment[answer];
  const itemName = itemNamesMap.get(itemId);
  const quantity = 1;

  if (itemId === null) {
    console.log("This slot is empty!");
  } else if (itemId === 0) {
    console.log("You can't unequip this item!");
  } else if (itemId === -1) {
    console.log("This slot is locked!");
  } else {
    await addItemToInventory(id, itemId, quantity);
    await unequipItem(id, answer);
    console.log(`You unequipped ${itemName}!`);
  }

  readlineSync.question("Press any key to return to the main menu.");
}
