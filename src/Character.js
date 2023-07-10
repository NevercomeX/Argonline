// src/Character.js

// Efecto de las pociones de HP y SP (talvez )
// Efecto de ítems consumibles (talvez )

class Character {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.name = name;
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.int = int;
    this.dex = dex;
    this.luk = luk;
    this.exp = 0; // Comenzamos con 0 experiencia
    this.level = 1; // Y en el nivel 1

    // Puntos de vida
    this.health = vit * 100 + (level - 1) * 100;

    // Puntos de maná
    this.mana = int * 100 + (level - 1) * 100;

    // Ataque
    //StatusATK = (BaseLevel ÷ 4) + Str + (Dex ÷ 5) + (Luk ÷ 3)

    this.strength = str * (level - 1) * 10;

    // Velocidad de ataque
    this.attackSpeed = agi * (level - 1) * 2;

    // Evasión
    this.evasion = agi * 0.5;

    // Tasa de golpe (HIT)
    this.hitRate = dex * 0.3;

    // Tasa de golpe crítico
    this.criticalRate = luk * 0.3;

    // // Regeneración de HP
    // this.healthRegen = vit * 0.5;

    // // Regeneración de SP
    // this.manaRegen = int * 0.5;

    // // Puntos de vida máximos y mínimos
    // this.maxHealth = vit * 100;
    // this.minHealth = vit * 10;

    // // Puntos de maná máximos y mínimos
    // this.maxMana = int * 100;
    // this.minMana = int * 10;

    // // Penetración mágica
    // this.magicPenetration = int * 0.5;

    // // Penetración física
    // this.physicalPenetration = str * 0.5;

    // // Daño crítico físico
    // this.physicalCriticalDamage = str * 0.5;

    // // Daño crítico mágico
    // this.magicCriticalDamage = int * 0.5;

    // // Tasa de regeneración de SP
    // this.manaRegenRate = int * 0.5;

    // // Tasa de regeneración de HP
    // this.healthRegenRate = vit * 0.5;

    // // Resistencia a ataques físicos
    // this.physicalResistance = vit * 0.5;

    // // Resistencia a ataques mágicos
    // this.magicResistance = int * 0.5;

    // // Velocidad de movimiento
    // this.movementSpeed = agi * 0.5;

    // // Resistencia a golpes críticos
    // this.criticalResistance = luk * 0.5;

    // // Recuperación de SP por golpe
    // this.manaRecoveryPerHit = int * 0.5;

    // // Recuperación de HP por golpe
    // this.healthRecoveryPerHit = vit * 0.5;

    // // Absorción de SP por golpe
    // this.manaAbsorptionPerHit = int * 0.5;

    // // Absorción de HP por golpe
    // this.healthAbsorptionPerHit = vit * 0.5;

    // // Costo de SP de las habilidades
    // this.manaCostPerSkill = int * 0.5;

    // // Tasa de drop de ítems
    // this.dropRate = luk * 0.5;

    // // Tasa de experiencia obtenida
    // this.expRate = luk * 0.5;

    // // Tasa de esquiva
    // this.dodgeRate = agi * 0.5;
  }

  // Podríamos definir un método para mostrar las estadísticas del personaje
  showStats() {
    console.log(
      `${this.name} - Nivel ${this.level} ${this.type}\n` +
        `STR: ${this.str}\n` +
        `AGI: ${this.agi}\n` +
        `VIT: ${this.vit}\n` +
        `INT: ${this.int}\n` +
        `DEX: ${this.dex}\n` +
        `LUK: ${this.luk}\n` +
        `EXP: ${this.exp}\n` +
        `HP: ${this.health}\n` +
        `ATK: ${this.strength}\n` +
        `ATK Speed: ${this.attackSpeed}\n` +
        `Evasion: ${this.evasion}\n` +
        `Critical Rate: ${this.criticalRate}\n`
    );
  }

  // Al derrotar a un enemigo, ganamos experiencia
  defeatEnemy(enemy) {
    // Por ejemplo, podríamos obtener EXP basado en el nivel del enemigo
    this.exp += enemy.level * 100;
    console.log(`${this.name} ganó ${enemy.level * 100} EXP!`);
    this.checkForLevelUp();
  }

  // Verifica si hemos ganado suficiente EXP para subir de nivel
  checkForLevelUp() {
    // Podríamos decir, por ejemplo, que necesitamos 1000 EXP para subir de nivel
    if (this.exp >= 1000) {
      this.levelUp();
    }
  }

  // Subir de nivel
  levelUp() {
    this.level += 1;
    // Restablecemos la EXP al excedente por encima de 1000
    this.exp = this.exp - 1000;

    // Y mejoramos nuestras estadísticas
    this.str += 1;
    this.agi += 1;
    this.vit += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;

    console.log(`${this.name} subió de nivel! Ahora es nivel ${this.level}!`);
  }

  attack(target) {
    if (target.health > 0) {
      // Calcular el daño físico considerando la defensa física del objetivo
      const physicalDamage = this.strength - target.defense;

      // Calcular el daño mágico considerando la defensa mágica del objetivo
      const magicalDamage = this.magic - target.magicDefense;

      // Aplicar los daños al objetivo si son positivos
      if (physicalDamage > 0) {
        target.health -= physicalDamage;
        console.log(
          `${this.name} attacked ${target.name} for ${physicalDamage} physical damage`
        );
      }

      if (magicalDamage > 0) {
        target.health -= magicalDamage;
        console.log(
          `${this.name} attacked ${target.name} for ${magicalDamage} magical damage`
        );
      }

      console.log(`${target.name}'s health is now ${target.health}`);
    }
  }

  dodge() {
    // Usamos Math.random() para obtener un número aleatorio entre 0 y 1, y si es menor que nuestra tasa de evasión (normalizada a estar entre 0 y 1),
    // entonces el personaje esquiva el ataque.
    if (Math.random() < this.evasion / 100) {
      console.log(`${this.name} dodged the attack!`);
      return true;
    } else {
      console.log(`${this.name} was hit!`);
      return false;
    }
  }

  // Creamos un nuevo método para atacar que tiene en cuenta la evasión
  attackAndConsiderEvasion(target) {
    if (!target.dodge()) {
      this.attack(target);
    }
  }
}

export default Character;
