import readlineSync from "readline-sync";
import select, { Separator } from "@inquirer/select";

import {
  getInventory,
  getEnemies,
  getEnemyDrops,
  getEquipment,
  getItems,
  getJobClasses,
  getCharacter,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  addItemToInventory,
  getCharacterInventoryItems,
  getCharacterInventory,
  getItemNameById,
  unequipItem,
} from "../Controllers/index.js";

const lineLength = 37; // The total length of the line

export async function EquipmentMenu(id) {
  const equipmentData = await getEquipmentByCharacterId(id);
  const equipment = equipmentData[0];
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

  // add and back to main menu options

  const itemIds = Object.values(equipment).filter((value) => value !== null);
  const itemNamesMap = new Map();
  for (const itemId of itemIds) {
    const itemName = await getItemNameById(itemId);
    itemNamesMap.set(itemId, itemName);
  }

  const equipmentSlotsArray = Object.entries(equipmentSlots).map(
    ([key, value]) => {
      const itemId = equipment[key];
      const itemName = itemNamesMap.get(itemId);
      if (itemName) {
        return {
          name: `║ ${value}: [ ${itemName} ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: itemName,
        };
      } else if (itemId === null) {
        return {
          name: `║ ${value}: [ Empty ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: "Empty",
        };
      } else if (itemId === 0) {
        return {
          name: `║ ${value}: [ Unequippable ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: "Unequippable",
        };
      } else if (itemId === -1) {
        return {
          name: `║ ${value}: [ Locked ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: "Locked",
        };
      } else if (itemId === -2) {
        return {
          name: `║ ${value}: [ Disabled ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: "Disabled",
        };
      } else if (itemId === -3) {
        return {
          name: `║ ${value}: [ Hidden ]`.padEnd(lineLength - 1) + "║",
          value: key,
          description: "Hidden",
        };
      }
    }
  );

  // ask the user if they want to unequip show item info or go back
  // if they want to unequip, ask them which item they want to unequip
  // if they want to show item info, show it
  // if they want to go back, go back

  //   const answer = await select({
  //     message: "What do you want to do?",
  //     choices: [
  //       new Separator(" "),
  //       new Separator(" ╔" + "═".repeat(35) + "╗"),
  //       { name: "║ Show item info", value: "showItemInfo" },
  //       { name: "║ Unequip an item", value: "unequipItem" },
  //       { name: "║ Go back", value: "goBack" },
  //       new Separator(" ╚" + "═".repeat(35) + "╝"),
  //       new Separator(" "),
  //     ],
  //     pageSize: 15,
  //   });

  //   if (answer === "showItemInfo") {
  //     await showItemInfo(id);
  //   } else if (answer === "unequipItem") {
  //     await unequipItemMenu(id);
  //   } else if (answer === "goBack") {
  //     return;
  //   }

  //   await EquipmentMenu(id);
  // }

  const answer = await select({
    message: "Which item do you want to unequip?",
    choices: [
      new Separator(" "),
      new Separator(" ╔" + "═".repeat(35) + "╗"),
      ...equipmentSlotsArray,
      new Separator(" ╚" + "═".repeat(35) + "╝"),
      new Separator(" "),
    ],
    pageSize: 15,
  });

  const itemId = equipment[answer];
  const itemName = itemNamesMap.get(itemId);
  const quantity = 1;
  if (itemId === null) {
    console.log("This slot is empty!");
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
    return;
  } else if (itemId === 0) {
    console.log("You can't unequip this item!");
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
    return;
  } else if (itemId === -1) {
    console.log("This slot is locked!");
    readlineSync.question(
      "Presiona cualquier tecla para volver al menu principal."
    );
    return;
  }
  await addItemToInventory(id, itemId, quantity);
  await unequipItem(id, answer);
  console.log(`You unequipped ${itemName}!`);
  readlineSync.question(
    "Presiona cualquier tecla para volver al menu principal."
  );
}
