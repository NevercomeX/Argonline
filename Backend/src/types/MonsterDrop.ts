import { Monster } from './Monster';
import { Item } from './Item';

export interface MonsterDrop {
  id: number;
  monsterId: number;
  itemId: number;
  rate: number;
  minQuantity: number;
  maxQuantity: number;
  isMvp: boolean;
  monster?: Monster;
  item?: Item;
}
