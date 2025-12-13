import { Monster } from './Monster';
import { Map } from './Map';

export interface MonsterSpawn {
  id: number;
  monsterId: number;
  mapId: number;
  x: number;
  y: number;
  amount: number;
  respawnTime: number;
  monster?: Monster;
  map?: Map;
}
