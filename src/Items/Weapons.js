class Weapon {
  constructor(name, type, damage) {
    this.name = name;
    this.type = type;
    this.damage = damage;
  }

  getInfo() {
    return `Weapon: ${this.name}, Type: ${this.type}, Damage: ${this.damage}`;
  }
}

class SwordmanWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Swordman";
  }
}

class MageWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Mage";
  }
}

class ArcherWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Archer";
  }
}

class MerchantWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Merchant";
  }
}

class ThiefWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Thief";
  }
}

class AcolyteWeapon extends Weapon {
  constructor(name, type, damage) {
    super(name, type, damage);
    this.job = "Acolyte";
  }
}

// Crear instancias de las clases de armas específicas de cada trabajo
const swordmanWeapon = new SwordmanWeapon("Sword", "One-Handed", 10);
const mageWeapon = new MageWeapon("Staff", "Two-Handed", 15);
const archerWeapon = new ArcherWeapon("Bow", "Ranged", 12);
const merchantWeapon = new MerchantWeapon("Dagger", "One-Handed", 8);
const thiefWeapon = new ThiefWeapon("Katar", "One-Handed", 10);
const acolyteWeapon = new AcolyteWeapon("Mace", "One-Handed", 9);

// exportar las clases de armas
module.exports = {
  SwordmanWeapon,
  MageWeapon,
  ArcherWeapon,
  MerchantWeapon,
  ThiefWeapon,
  AcolyteWeapon,
};

// console.log(swordmanWeapon.getInfo());
// console.log(mageWeapon.getInfo());
// console.log(archerWeapon.getInfo());
// console.log(merchantWeapon.getInfo());
// console.log(thiefWeapon.getInfo());
// console.log(acolyteWeapon.getInfo());
