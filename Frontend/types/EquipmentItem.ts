import { Character } from "@/types/Character";
import { EquipmentSlot } from "@/types/Enums/EquipmentSlotEnum";
import { Item } from "@/types/Item";
import { ItemInstance } from "@/types/ItemInstance";
import { ElementType } from "react";

export type EquipmentItem = {
  id: number;
  characterId: number;
  itemId?: number;
  itemInstanceId?: number;
  slot: EquipmentSlot;
  durability: number;
  refineLevel: number;
  cards?: any; // JSON
  element: ElementType;
  character: Character;
  item?: Item;
  itemInstance?: ItemInstance;
};