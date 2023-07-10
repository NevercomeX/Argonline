class LowHelmet {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Low-Helmet: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class StrengthLowHelmet extends LowHelmet {
  constructor(str) {
    const attack = str * (baseLevel - 1) * 10;
    super("Strength Low-Helmet", attack);
  }
}
