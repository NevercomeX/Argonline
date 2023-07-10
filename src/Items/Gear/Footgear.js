class Boots {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Boots: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class SpeedBoots extends Boots {
  constructor(agi) {
    const attackSpeed = agi * (baseLevel - 1) * 2;
    super("Speed Boots", attackSpeed);
  }
}

export { Boots, SpeedBoots };
