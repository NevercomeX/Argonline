class Helmet {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Helmet: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class StrengthHelmet extends Helmet {
  constructor(str) {
    const attack = str * (baseLevel - 1) * 10;
    super("Strength Helmet", attack);
  }
}

export { Helmet, StrengthHelmet };
