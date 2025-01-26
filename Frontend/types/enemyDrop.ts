import { Enemy } from "./enemy";
import { Item } from "./item";

export interface EnemyDrop {
  id: number;
  enemyId: number;
  itemId: number;
  dropChance: number;
  enemy: Enemy;
  item: Item;
}
