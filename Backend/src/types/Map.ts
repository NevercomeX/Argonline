import { MonsterSpawn } from './MonsterSpawn';

export interface Map {
  id: number;
  name: string;
  file: string;
  width: number;
  height: number;
  spawns?: MonsterSpawn[];
}
