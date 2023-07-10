class Accessory {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Accessory: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class HealthAccessory extends Accessory {
  constructor(vit, baseLevel) {
    const health = vit * 100 + (baseLevel - 1) * 100;
    super("Health Accessory", health);
  }
}

class ManaAccessory extends Accessory {
  constructor(int, baseLevel) {
    const mana = int * 100 + (baseLevel - 1) * 100;
    super("Mana Accessory", mana);
  }
}

export { Accessory, HealthAccessory, ManaAccessory };
// Resto de las clases de accesorios
