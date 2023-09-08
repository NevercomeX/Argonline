//index of the controllers

import { getCharacter, updateCharacter } from "./character.js";
import { getEnemies, getEnemyById } from "./enemies.js";
import {
  getItems,
  getItemNameById,
  getItemsByName,
  getItemsById,
} from "./items.js";
import {
  getJobClasses,
  getJobClassById,
  getJobClassNameById,
  getJobClassByName,
} from "./jobClass.js";
import {
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  getCharacterInventory,
} from "./inventary.js";
import { getEnemyDrops, getEnemyDropById } from "./enemydrop.js";

import {
  getEquipment,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getEquipmentById,
} from "./equipment.js";

export {
  getCharacter,
  updateCharacter,
  getEnemies,
  getEnemyById,
  getItems,
  getItemNameById,
  getItemsByName,
  getItemsById,
  getJobClasses,
  getJobClassById,
  getJobClassNameById,
  getJobClassByName,
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  getCharacterInventory,
  getEnemyDrops,
  getEnemyDropById,
  getEquipment,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getEquipmentById,
};
