import { Item } from './Item';
import { InventoryItem } from './InventoryItem';
import { EquipmentItem } from './EquipmentItem';

export interface ItemInstance {
  id: number;
  itemId: number;
  refineLevel: number;
  durability: number;
  enchantments?: any | null; // Json
  cards?: any | null; // Json
  createdAt: Date;
  item?: Item;
  inventoryItems?: InventoryItem[];
  equipmentItems?: EquipmentItem[];
}
