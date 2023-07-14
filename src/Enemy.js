class Enemy {
  constructor(
    name,
    health,
    attackPower,
    defense,
    magicDefense,
    magicPower,
    monsterType,
    attackType,
    baseLevel,
    baseExpAmount,
    jobExpAmount,
    loot
  ) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attackPower = attackPower;
    this.magicPower = magicPower;
    this.defense = defense;
    this.magicDefense = magicDefense;
    this.baseExpAmount = baseExpAmount;
    this.jobExpAmount = jobExpAmount;
    this.baseLevel = baseLevel;
    this.monsterType = monsterType; // 'normal', 'boss', 'mini-boss'
    this.attackType = attackType; // 'physical' or 'magical'
    this.loot = loot;
  }
  physicalAttack(target) {
    let damage;
    if (target.isDefending) {
      damage = this.attackPower - target.defense + target.defense / 2;
      target.isDefending = false; // The character stops defending after being attacked
    } else {
      damage = this.attackPower - target.defense;
    }

    if (damage < 0) damage = 0; // Damage can't be negative
    console.log(
      `${this.name} physically attacks ${target.name} for ${damage} damage.`
    );
    target.health -= damage;
  }

  magicalAttack(target) {
    let damage = this.magicPower - target.magicDefense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.log(
      `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`
    );
    target.health -= damage;
  }

  attack(target) {
    if (this.attackType === "physical") {
      this.physicalAttack(target);
    } else if (this.attackType === "magical") {
      this.magicalAttack(target);
    }
  }
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
