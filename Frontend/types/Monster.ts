import { MonsterDrop } from "@/types/MonsterDrop";
import { MonsterSpawn } from "@/types/MonsterSpawn";
import { ElementType } from "@/types/Enums/ElementTypeEnum";

export type Monster = {
  id: number;
  name: string;
  level: number;
  health: number;
  mana: number;
  baseExp: number;
  jobExp: number;
  attack: number;
  magicAttack: number;
  defense: number;
  magicDefense: number;
  attackSpeed: number;
  moveSpeed: number;
  attackRange: number;
  element: ElementType;
  size: string;
  race: string;
  sprite?: string;
  drops: MonsterDrop[];
  spawns: MonsterSpawn[];
};