class Enemy extends Character {
  constructor(
    name,
    level = 1,
    exp = 0,
    stats = { str, agi, vit, int, dex, luk }
  ) {
    super(name, level, exp, stats);
    this.type = "Enemy";
    this.health = vit * 100 + (level - 1) * 100;
    this.mana = int * 100 + (level - 1) * 100;
    this.strength = str * (level - 1) * 10;
    this.attackSpeed = agi * (level - 1) * 2;
    this.evasion = agi * 0.5;
    this.hitRate = dex * 0.3;
    this.criticalRate = luk * 0.3;
    this.dropItems = []; // Items que el enemigo puede soltar al ser derrotado.
    //EXP que el enemigo otorga al ser derrotado.
    this.exp = 0;
    //Nivel del enemigo.
    this.level = 1;
  }

  // Puedes definir otros métodos que sean específicos de los enemigos
  attack(character) {
    console.log(`${this.name} ataca a ${character.name}`);

    character.health -= this.strength;
    console.log(
      `${this.name} atacó a ${character.name}, la salud de ${character.name} es ahora ${character.health}`
    );
  }

  dropItem() {
    return this.drops
      .filter((drop) => Math.random() < drop.dropRate)
      .map((drop) => drop.item);
  }
}

export default Enemy;
