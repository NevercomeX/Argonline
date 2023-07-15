import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import EntityBase from "./EntityBase.js";

@Entity()
class Enemy extends EntityBase {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column()
  name = "";

  @Column()
  health = 0;

  @Column()
  maxHealth = 0;

  @Column()
  attackPower = 0;

  @Column()
  magicPower = 0;

  @Column()
  defense = 0;

  @Column()
  magicDefense = 0;

  @Column()
  baseExpAmount = 0;

  @Column()
  jobExpAmount = 0;

  @Column()
  baseLevel = 0;

  @Column()
  monsterType = ""; // 'normal', 'boss', 'mini-boss'

  @Column()
  attackType = ""; // 'physical' or 'magical'

  @Column("simple-array")
  loot = [];

  dropLoot() {
    // Itera sobre cada objeto de botín posible
    for (let i = 0; i < this.loot.length; i++) {
      let lootItem = this.loot[i];
      // Genera un número aleatorio entre 0 y 1
      let random = Math.random();
      // Si el número aleatorio es menor que la probabilidad de caída del objeto, lo deja caer
      if (random < lootItem.dropChance) {
        console.log(`${this.name} dropped a ${lootItem.name}!`);
        return lootItem;
      }
    }
    // Si no se deja caer ningún objeto, devuelve null
    return null;
  }
}

export default Enemy;
