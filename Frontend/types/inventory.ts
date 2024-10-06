import { Character } from './character';
import { Item } from './item';
import { ItemInstance } from './itemInstance';

export interface Inventory {
  id: number;
  itemId?: number | null;
  characterId: number;
  itemInstanceId?: number | null;
  quantity: number;
  character: Character;
  itemInstance?: ItemInstance | null;
  item?: Item | null;
}
