class MidHelmet {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Mid-Helmet: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class DefenseMidHelmet extends MidHelmet {
  constructor(vit) {
    const defense = vit * 0.5;
    super("Defense Mid-Helmet", defense);
  }
}

// Resto de las clases de mid-helmet
