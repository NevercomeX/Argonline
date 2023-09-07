export default class Entity {
  constructor(
    name,
    health,
    attackPower,
    magicPower,
    defense,
    magicDefense,
    mana,
    maxHealth,
    maxMana
  ) {
    this.name = name;
    this.attackPower = attackPower;
    this.magicPower = magicPower;
    this.attackType = "physical";
    this.defense = defense;
    this.magicDefense = magicDefense;
    this.health = health;
    this.mana = mana;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
    this.isDefending = false;
  }

  physicalAttack(target) {
    let damage = this.attackPower - target.defense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    // console.log(
    //   `${this.name} ataca físicamente a ${target.name} por ${damage} de daño.`
    // );
    console.log(" ");
    target.health -= damage;
    //vida restante
  }

  magicalAttack(target) {
    let damage = this.magicPower - target.magicDefense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.log(
      `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`
    );
    target.health -= damage;
  }

  defend(target) {
    this.isDefending = true;
    return;
  }

  attack(target) {
    if (this.attackType === "physical") {
      this.physicalAttack(target);
    } else if (this.attackType === "magical") {
      this.magicalAttack(target);
    }
  }
}
