export default class Entity {
  constructor(
    name,
    health,
    attackPower,
    defense,
    magicDefense,
    mana,
    maxHealth,
    maxMana
  ) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.defense = defense;
    this.magicDefense = magicDefense;
    this.isDefending = false;
    this.maxHealth = health;
    this.attackType = "physical";
    this.health = health;
    this.mana = mana;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
  }

  attack(target) {
    let damage;
    if (target.isDefending) {
      let targetDefense = target.defense * 2; // The target's defense is doubled when defending
      damage = this.attackPower - targetDefense;
      target.isDefending = false; // The target stops defending after being attacked
    } else {
      damage = this.attackPower - target.defense;
    }

    if (damage < 0) damage = 0; // Damage can't be negative

    console.log(`${this.name} attacks ${target.name} for ${damage} damage.`);

    target.health -= damage;
  }

  defend() {
    this.isDefending = true;
    console.log(`${this.name} is defending.`);
  }
}
