class Shield {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Shield: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class DefenseShield extends Shield {
  constructor(vit) {
    const defense = vit * 0.5;
    super("Defense Shield", defense);
  }
}

export { Shield, DefenseShield };
