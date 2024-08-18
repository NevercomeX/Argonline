//index of the controllers

import { getCharacterById, updateCharacter } from "./character.js";
import { getEnemies, getEnemyById } from "./enemies.js";
import {
  getItems,
  getItemNameById,
  getItemsByName,
  getItemsById,
} from "./items.js";

import {  createItemInstance,
  getItemInstanceById,
  getItemInstanceNameById,
  updateItemInstance,
  deleteItemInstance, } from "./itemInstanceController.js";
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
  addItemToInventory,
  removeItemFromInventory,
} from "./inventary.js";
import { getEnemyDrops, getEnemyDropById } from "./enemydrop.js";

import {
  getEquipment,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getEquipmentById,
  unequipItem,
  equipItem,
} from "./equipment.js";

export {
  getCharacterById,
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
  addItemToInventory,
  removeItemFromInventory,
  getCharacterInventoryItems,
  getCharacterInventory,
  getEnemyDrops,
  getEnemyDropById,
  getEquipment,
  unequipItem,
  equipItem,
  getEquipmentByCharacterId,
  getEquipmentByCharacterIdAndSlot,
  getEquipmentById,
  createItemInstance,
  getItemInstanceById,
  getItemInstanceNameById,
  updateItemInstance,
  deleteItemInstance,
};
