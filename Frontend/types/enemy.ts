import { EnemyDrop } from './enemyDrop';

export interface Enemy {
  id: number;
  name: string;
  attackType: string;
  giveBaseExpAmount: number;
  giveJobExpAmount: number;
  health: number;
  maxHealth: number;
  attackPower: number;
  magicPower: number;
  defense: number;
  magicDefense: number;
  baseLevel: number;
  monsterType: string;
  itemDrops: EnemyDrop[];
  mobIcon: string;
}
