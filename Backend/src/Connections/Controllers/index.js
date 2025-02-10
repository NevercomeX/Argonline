//index of the controllers

import {
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  createCharacter,
  getCharactersByUserId,
  createCharacterWithAttributes,
} from "./Character/characterController.js";

import { getAvailableSkills, levelUpCharacterSkill, resetCharacterSkills, learnCharacterSkill,getSkillTreeByJobClassId} from "./Skill/skillsController.js";

import { getAllUsers, getAllCharactersFromUser, getUserById, getUserIdFromToken } from "./user/usersController.js";

import { loginUser, registerUser } from "./user/authController.js";

import { getEnemies, getEnemyById, getRandomEnemy } from "./Enemy/enemies.js";
import {
  getAllItems,
  getItemNameById,
  getItemsByIds,
  getItemById,
} from "./Item/itemsController.js";

import {
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  addItemToInventory,
  removeItemFromInventory,
} from "./Inventory/inventoryController.js";

import { getStorageItems, getStorageItemById, addItemToStorage, removeItemFromStorage } from "./Inventory/storageController.js";
import { getEnemyDrops, getEnemyDropById } from "./Enemy/enemydrop.js";

import {
  getEquipment,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  unequipItem,
  equipItem,
  getEquipmentMenu,
} from "./Equipment/equipmentController.js";

export {
  getAllUsers,
  getUserById,
  getAllCharactersFromUser,
  registerUser,
  createCharacter,
  loginUser,
  getUserIdFromToken,
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  getEnemies,
  getEnemyById,
  getAllItems,
  getItemNameById,
  getItemById,
  getItemsByIds,
  getInventory,
  getInventoryById,
  addItemToInventory,
  removeItemFromInventory,
  getCharacterInventoryItems,
  createCharacterWithAttributes,
  getEquipmentMenu,
  getEnemyDrops,
  getEnemyDropById,
  getStorageItems, getStorageItemById, addItemToStorage, removeItemFromStorage,
  getEquipment,
  unequipItem,
  equipItem,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  getRandomEnemy,
  getCharactersByUserId,
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
  getSkillTreeByJobClassId,
};
