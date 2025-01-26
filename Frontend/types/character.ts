import { Inventory } from "./inventory";
import { EquipmentSlot } from "./equipmentSlot";
import { ItemInstance } from "./itemInstance";
import { User } from "./user";

export interface Character {
  id: number;
  name: string;
  userId: number;
  jobclassId: number;
  str: number;
  agi: number;
  vit: number;
  int: number;
  dex: number;
  luk: number;
  baseLevel: number;
  jobLevel: number;
  baseExp: number;
  jobExp: number;
  maxBaseExp: number;
  maxJobExp: number;
  skillPoints: number;
  health: number;
  maxHealth: number;
  maxMana: number;
  mana: number;
  attackPower: number;
  magicPower: number;
  defense: number;
  magicDefense: number;
  gender: "M" | "F";
  inventory: Inventory[];
  equipmentSlot: EquipmentSlot[];
  items: ItemInstance[];
  user: User;
}
