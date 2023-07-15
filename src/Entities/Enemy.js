import Entity from "./Entity.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Enemy extends Entity {
  constructor(enemy) {
    super(
      enemy.health,
      enemy.attackPower,
      enemy.magicPower,
      enemy.defense,
      enemy.magicDefense,
      enemy.baseLevel
    );
    this.id = enemy.id;
    this.name = enemy.name;
    this.health = enemy.health;
    this.maxHealth = enemy.health;
    this.attackPower = enemy.attackPower;
    this.magicPower = enemy.magicPower;
    this.defense = enemy.defense;
    this.magicDefense = enemy.magicDefense;
    this.baseExpAmount = enemy.baseExpAmount;
    this.jobExpAmount = enemy.jobExpAmount;
    this.baseLevel = enemy.baseLevel;
    this.monsterType = enemy.monsterType;
    this.attackType = enemy.attackType;
  }

  static async create(enemyData) {
    const enemy = await prisma.enemy.create({ data: enemyData });
    return new Enemy(enemy);
  }

  static async findById(id) {
    const enemy = await prisma.enemy.findUnique({ where: { id } });
    return new Enemy(enemy);
  }

  // dropLoot() {
  //   // Itera sobre cada objeto de botín posible
  //   for (let i = 0; i < this.loot.length; i++) {
  //     let lootItem = this.loot[i];
  //     // Genera un número aleatorio entre 0 y 1
  //     let random = Math.random();
  //     // Si el número aleatorio es menor que la probabilidad de caída del objeto, lo deja caer
  //     if (random < lootItem.dropChance) {
  //       console.log(`${this.name} dropped a ${lootItem.name}!`);
  //       return lootItem;
  //     }
  //   }
  //   // Si no se deja caer ningún objeto, devuelve null
  //   return null;
  // }
}

export default Enemy;
