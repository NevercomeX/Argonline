import { ElementType } from './ElementType';
import { MonsterDrop } from './MonsterDrop';
import { MonsterSpawn } from './MonsterSpawn';

export interface Monster {
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
  sprite?: string | null;
  drops?: MonsterDrop[];
  spawns?: MonsterSpawn[];
}
