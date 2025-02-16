import { MonsterSpawn } from "@/types/MonsterSpawn";

export type Map = {
  id: number;
  name: string;
  file: string;
  width: number;
  height: number;
  spawns: MonsterSpawn[];
};