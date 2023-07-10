class Potion {
  constructor(
    name,
    type,
    effect,
    health,
    mana,
    quantity,
    weight,
    price,
    rarity
  ) {
    this.name = name;
    this.type = type;
    this.effect = effect;
    this.health = health;
    this.mana = mana;

    this.quantity = quantity;
    this.weight = weight;
    this.price = price;
    this.rarity = rarity;
  }

  getInfo() {
    return `Potion: ${this.name}, Type: ${this.type}, Effect: ${this.effect}`;
  }
}

class HealthPotion extends Potion {
  constructor() {
    super(
      "Health Potion",
      "Health",
      "Restore 50 HP",
      50,
      0,
      1,
      0.5,
      10,
      "Common"
    );
  }
}

class ManaPotion extends Potion {
  constructor() {
    super("Mana Potion", "Mana", "Restore 30 MP", 0, 30, 1, 0.5, 10, "Common");
  }
}

// Crear instancias de las clases de pociones
const healthPotion = new HealthPotion();
const manaPotion = new ManaPotion();

// Exportar las clases de pociones
module.exports = {
  HealthPotion,
  ManaPotion,
};

console.log(healthPotion.getInfo());
console.log(manaPotion.getInfo());
