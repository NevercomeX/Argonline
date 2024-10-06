class Weapon {
  constructor(name, attackPower, defensePower) {
    this.name = name;
    this.attackPower = attackPower;
    this.defensePower = defensePower;
  }

  getInfo() {
    return `${this.name} (Attack Power: ${this.attackPower}, Defense Power: ${this.defensePower})`;
  }
}
