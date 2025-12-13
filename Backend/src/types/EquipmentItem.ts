import { EquipmentSlot } from './EquipmentSlot';
import { ElementType } from './ElementType';
import { Character } from './Character';
import { Item } from './Item';
import { ItemInstance } from './ItemInstance';

export interface EquipmentItem {
  id: number;
  characterId: number;
  itemId?: number | null;
  itemInstanceId?: number | null;
  slot: EquipmentSlot;
  durability: number;
  refineLevel: number;
  cards?: any | null; // Json
  element: ElementType;
  character?: Character;
  item?: Item | null;
  itemInstance?: ItemInstance | null;
}
