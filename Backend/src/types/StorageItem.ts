import { User } from './User';
import { Item } from './Item';

export interface StorageItem {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  refineLevel: number;
  cards?: any | null; // Json
  user?: User;
  item?: Item;
}
