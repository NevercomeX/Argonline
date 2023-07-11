class Enemy {
  constructor(name, health, attackPower, magicPower) {
    this.name = name;
    this.health = health;
    // this.mana = int * 100 + (level - 1) * 100;
    // this.strength = str * (level - 1) * 10;
    // this.attackSpeed = agi * (level - 1) * 2;
    // this.evasion = agi * 0.5;
    // this.hitRate = dex * 0.3;
    // this.criticalRate = luk * 0.3;
    // this.dropItems = [];
    // this.exp = 0;
    // this.level = 1;
    this.attackPower = attackPower;
    this.magicPower = magicPower;
  }

  physicalAttack(target) {
    let damage = this.attackPower - target.physicalDefense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.log(
      `${this.name} ataca físicamente a ${target.name} por ${damage} de daño.`
    );
    target.health -= damage;
  }

  magicalAttack(target) {
    let damage = this.magicPower - target.magicalDefense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.log(
      `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`
    );
    target.health -= damage;
  }

  // Puedes definir otros métodos que sean específicos de los enemigos
  attack(target) {
    console.log(`${this.name} ataca a ${character.name}`);

    character.health -= this.strength;
    console.log(
      `${this.name} atacó a ${character.name}, la salud de ${character.name} es ahora ${character.health}`
    );
  }

  dropItem() {
    return this.drops
      .filter((drop) => Math.random() < drop.dropRate)
      .map((drop) => drop.item);
  }
}

export default Enemy;
