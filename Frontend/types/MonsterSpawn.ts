import { Monster } from "@/types/Monster";
import { Map } from "@/types/Map";

export type MonsterSpawn = {
  id: number;
  monsterId: number;
  mapId: number;
  x: number;
  y: number;
  amount: number;
  respawnTime: number;
  monster: Monster;
  map: Map;
};