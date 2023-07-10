class Armor {
  constructor(name, type, defense, magicDefense) {
    this.name = name;
    this.type = type;
    this.defense = defense;
    this.magicDefense = magicDefense;
  }

  getInfo() {
    return `Armor: ${this.name}, Type: ${this.type}, Defense: ${this.defense}`;
  }
}
class Novice extends Armor {
  constructor() {
    super("Cotton Shirt", "Armor", 10, 10);
  }
}

class SwordmanArmor extends Armor {
  constructor() {
    super("Assaulter Plate", "Armor", 10, 5);
  }
}

class MageArmor extends Armor {
  constructor() {
    super("Coat", "Armor", 5, 15);
  }
}

class ArcherArmor extends Armor {
  constructor() {
    super("Archer Clothes", "Armor", 7, 3);
  }
}

class MerchantArmor extends Armor {
  constructor() {
    super("Merchant Clothes", "Armor", 6, 4);
  }
}

class ThiefArmor extends Armor {
  constructor() {
    super("Chameleon Armor", "Armor", 5, 5);
  }
}

class AcolyteArmor extends Armor {
  constructor() {
    super("Divine Cloth ", "Armor", 5, 10);
  }
}

// Crear instancias de las clases de armaduras para cada trabajo
const swordmanArmor = new SwordmanArmor();
const mageArmor = new MageArmor();
const archerArmor = new ArcherArmor();
const merchantArmor = new MerchantArmor();
const thiefArmor = new ThiefArmor();
const acolyteArmor = new AcolyteArmor();

// Exportar las clases de armaduras
module.exports = {
  Novice,
  SwordmanArmor,
  MageArmor,
  ArcherArmor,
  MerchantArmor,
  ThiefArmor,
  AcolyteArmor,
};

// console.log(swordmanArmor.getInfo());
// console.log(mageArmor.getInfo());
// console.log(archerArmor.getInfo());
// console.log(merchantArmor.getInfo());
// console.log(thiefArmor.getInfo());
// console.log(acolyteArmor.getInfo());
