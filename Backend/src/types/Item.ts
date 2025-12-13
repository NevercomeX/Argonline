import { ItemType } from './ItemType';
import { JobName } from './JobName';
import { ElementType } from './ElementType';
import { Recipe } from './Recipe';
import { InventoryItem } from './InventoryItem';
import { StorageItem } from './StorageItem';
import { EquipmentItem } from './EquipmentItem';
import { MonsterDrop } from './MonsterDrop';
import { ItemInstance } from './ItemInstance';

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  jobRequired?: JobName | null;
  description: string;
  buyPrice: number;
  sellPrice: number;
  weight: number;
  attack?: number | null;
  magicAttack?: number | null;
  defense?: number | null;
  magicDefense?: number | null;
  requiredLevel?: number | null;
  slot?: number | null;
  equipSlots: any; // Json
  script?: string | null;
  isStackable: boolean;
  maxStack: number;
  isTradable: boolean;
  isConsumable: boolean;
  element: ElementType;
  cardSlots?: number | null;
  sprite?: string | null;
  recipes?: Recipe[];
  inventoryItems?: InventoryItem[];
  storageItems?: StorageItem[];
  equipmentItems?: EquipmentItem[];
  drops?: MonsterDrop[];
  instances?: ItemInstance[];
}
