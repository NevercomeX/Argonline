class Cape {
  constructor(name, attribute) {
    this.name = name;
    this.attribute = attribute;
  }

  getInfo() {
    return `Cape: ${this.name}, Attribute: ${this.attribute}`;
  }
}

class DefenseCape extends Cape {
  constructor(vit) {
    const defense = vit * 0.5;
    super("Defense Cape", defense);
  }
}

class MagicDefenseCape extends Cape {
  constructor(int) {
    const magicDefense = int * 0.5;
    super("Magic Defense Cape", magicDefense);
  }
}

export { Cape, DefenseCape, MagicDefenseCape };
