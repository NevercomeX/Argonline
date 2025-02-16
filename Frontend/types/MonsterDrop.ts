import { Item } from "@/types/Item";
import { Monster } from "@/types/Monster";

export type MonsterDrop = {
  id: number;
  monsterId: number;
  itemId: number;
  rate: number;
  minQuantity: number;
  maxQuantity: number;
  isMvp: boolean;
  monster: Monster;
  item: Item;
};