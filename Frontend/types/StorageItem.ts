import { Item } from "@/types/Item";
import { User } from "@/types/User";

export type StorageItem = {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  refineLevel: number;
  cards?: any; // JSON
  user: User;
  item: Item;
};