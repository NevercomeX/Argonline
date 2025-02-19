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
} from "./Character/characterController.js";

// ================================
// Skill Controllers
// ================================
import {
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
  getSkillTreeByJobClassId,
} from "./Skill/skillsController.js";

// ================================
// User Controllers
// ================================
import {
  getAllUsers,
  getAllCharactersFromUser,
  getUserById,
  getUserIdFromToken,
} from "./user/usersController.js";

//=================================
// Stats Controllers
//=================================
import { calculateCombatStats } from "./Stats/statsCalculatorControllerV2.js";

// ================================
// Authentication Controllers
// ================================
import { loginUser, registerUser } from "./user/authController.js";

// ================================
// Enemy Controllers
// ================================
import { getEnemies, getEnemyById, getRandomEnemy } from "./Enemy/enemies.js";
import { getEnemyDrops, getEnemyDropById } from "./Enemy/enemydrop.js";

// ================================
// Items Transactions
// ================================
import { purchaseItem, sellItem, getShopItems } from "./Item/itemTransactions.js";

// ================================
// Item Controllers
// ================================
import {
  getAllItems,
  getItemNameById,
  getItemsByIds,
  getItemById,
} from "./Item/itemsController.js";

// ================================
// Inventory Controllers
// ================================
import {
  getInventory,
  getInventoryById,
  getCharacterInventoryItems,
  addItemToInventory,
  removeItemFromInventory,
} from "./Inventory/inventoryController.js";

// ================================
// Storage Controllers
// ================================
import {
  getStorageItems,
  getStorageItemById,
  addItemToStorage,
  removeItemFromStorage,
} from "./Inventory/storageController.js";

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
} from "./Equipment/equipmentController.js";


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

  // Stats
  calculateCombatStats,

  // Enemy
  getEnemies,
  getEnemyById,
  getRandomEnemy,
  getEnemyDrops,
  getEnemyDropById,

  // Item Transactions
  purchaseItem,
  sellItem,
  getShopItems,

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
