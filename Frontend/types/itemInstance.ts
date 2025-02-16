import { EquipmentItem } from "@/types/EquipmentItem";
import { InventoryItem } from "@/types/InventoryItem";
import { Item } from "@/types/Item";

export type ItemInstance = {
  id: number;
  itemId: number;
  refineLevel: number;
  durability: number;
  enchantments?: any; // JSON
  cards?: any; // JSON
  createdAt: Date;
  item: Item;
  inventoryItems: InventoryItem[];
  equipmentItems: EquipmentItem[];
};