import { Character } from './Character';
import { Item } from './Item';
import { ItemInstance } from './ItemInstance';

export interface InventoryItem {
  id: number;
  characterId: number;
  itemId?: number | null;
  itemInstanceId?: number | null;
  quantity: number;
  character?: Character;
  item?: Item | null;
  itemInstance?: ItemInstance | null;
}
