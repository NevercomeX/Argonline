import { Inventory } from "./inventory";
import { EnemyDrop } from "./enemyDrop";

export interface Item {
  id: number;
  name: string;
  itemType: string;
  itemSubType: string;
  equipmentSlot?: string | null;
  description: string;
  price: number;
  attackPower: number;
  magicPower: number;
  defense: number;
  magicDefense: number;
  health: number;
  mana: number;
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
  slot: number;
  weaponType: string;
  usable: boolean;
  rarity: string;
  effect?: string | null;
  equipable: boolean;
  inventory: Inventory[];
  enemyDrops: EnemyDrop[];
  itemIcon: string;
}
