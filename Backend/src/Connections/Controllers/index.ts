// ================================
// Character Controllers
// ================================
import {
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  createCharacter,
  createCharacterWithAttributes,
  getCharactersByUserId,
} from "./Character/characterController";

// ================================
// Skill Controllers
// ================================
import {
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
  getSkillTreeByJobClassId,
} from "./Skill/skillsController";

// ================================
// User Controllers
// ================================
import {
  getAllUsers,
  getAllCharactersFromUser,
  getUserById,
  getUserIdFromToken,
} from "./user/usersController";

// ================================
// Authentication Controllers
// ================================
import { loginUser, registerUser } from "./user/authController";

// ================================
// Enemy Controllers
// ================================
import { getEnemies, getEnemyById, getRandomEnemy } from "./Enemy/enemies";
import { getEnemyDrops, getEnemyDropById } from "./Enemy/enemydrop";

// ================================
// Item Controllers
// ================================
import {
  getAllItems,
  getItemNameById,
  getItemsByIds,
  getItemById,
} from "./Item/itemsController";

// ================================
// Inventory Controllers
// ================================
import {
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  addItemToInventory,
  removeItemFromInventory,
} from "./Inventory/inventoryController";

// ================================
// Storage Controllers
// ================================
import {
  getStorageItems,
  getStorageItemById,
  addItemToStorage,
  removeItemFromStorage,
} from "./Inventory/storageController";

// ================================
// Equipment Controllers
// ================================
import {
  getEquipment,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  unequipItem,
  equipItem,
  getEquipmentMenu,
} from "./Equipment/equipmentController";


// ================================
// Export all controllers
// ================================
export {
  // User and Authentication
  getAllUsers,
  getUserById,
  getAllCharactersFromUser,
  getUserIdFromToken,
  registerUser,
  loginUser,

  // Character
  getCharacterById,
  updateCharacter,
  getAllCharacters,
  createCharacter,
  createCharacterWithAttributes,
  getCharactersByUserId,

  // Enemy
  getEnemies,
  getEnemyById,
  getRandomEnemy,
  getEnemyDrops,
  getEnemyDropById,

  // Items
  getAllItems,
  getItemNameById,
  getItemById,
  getItemsByIds,

  // Inventory
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  addItemToInventory,
  removeItemFromInventory,

  // Storage
  getStorageItems,
  getStorageItemById,
  addItemToStorage,
  removeItemFromStorage,

  // Equipment
  getEquipment,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  getEquipmentById,
  unequipItem,
  equipItem,
  getEquipmentMenu,

  // Skills
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
  getSkillTreeByJobClassId,
};
