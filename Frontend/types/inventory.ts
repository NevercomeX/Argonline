import { Character } from "@/types/Character";
import { Item } from "@/types/Item";
import { ItemInstance } from "@/types/ItemInstance";


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
