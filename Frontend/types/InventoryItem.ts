import { Character } from "@/types/Character";
import { Item } from "@/types/Item";
import { ItemInstance } from "@/types/ItemInstance";

export type InventoryItem = {
  id: number;
  characterId: number;
  itemId?: number;
  itemInstanceId?: number;
  quantity: number;
  character: Character;
  item?: Item;
  itemInstance?: ItemInstance;
};