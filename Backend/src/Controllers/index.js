//index of the controllers

import {
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  createCharacter 
} from "./Character/character.js";

import {
  getAllUsers,
  getAllCharactersFromUser,
} from "./user/users.js";

import { loginUser, registerUser } from "./user/authController.js";

import { getEnemies, getEnemyById, getRandomEnemy } from "./Enemy/enemies.js";
import {
  getAllItems,
  getItemNameById,
  getItemsByName,
  getItemsById,
} from "./Item/items.js";

import {
  updateCharacterStatsInRedis,
  calculateTotalStats,
  syncStatsToDatabase,
  getCharacterStatsFromRedis,
} from "./Stats/statsController.js";

import {
  createItemInstance,
  getItemInstanceById,
  getItemInstanceNameById,
  updateItemInstance,
  deleteItemInstance,
  getItemInstancesByCharacterId,
} from "./Item/itemInstanceController.js";
import {
  getJobClasses,
  getJobClassById,
  getJobClassNameById,
  getJobClassByName,
} from "./Character/jobClass.js";
import {
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  getCharacterInventory,
  addItemToInventory,
  removeItemFromInventory,
} from "./Inventory/inventory.js";
import { getEnemyDrops, getEnemyDropById } from "./Enemy/enemydrop.js";

import {
  getEquipment,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  unequipItem,
  equipItem,
} from "./Equipment/equipment.js";

export {
  getAllUsers,
  getAllCharactersFromUser,
  registerUser,
  createCharacter,
  loginUser,
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  getEnemies,
  getEnemyById,
  getAllItems,
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
  getItemInstancesByCharacterId,
  getEnemyDrops,
  getEnemyDropById,
  getEquipment,
  unequipItem,
  equipItem,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  createItemInstance,
  getItemInstanceById,
  getItemInstanceNameById,
  updateItemInstance,
  deleteItemInstance,
  getRandomEnemy,
  updateCharacterStatsInRedis,
  calculateTotalStats,
  syncStatsToDatabase,
  getCharacterStatsFromRedis,
};
