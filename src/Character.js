// src/Character.js

// Efecto de las pociones de HP y SP (talvez )
// Efecto de ítems consumibles (talvez )

import EquipmentSlot from "./Items/EquipmentSlot.js";
import Inventory from "./Items/Inventory.js";

class Character {
  constructor(name, str, agi, vit, int, dex, luk) {
    this.name = name;
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.int = int;
    this.dex = dex;
    this.luk = luk;

    this.inventory = new Inventory();

    this.headgearSlot = new EquipmentSlot("Headgear", this.inventory);
    this.armorSlot = new EquipmentSlot("Armor", this.inventory);
    this.weaponSlot = new EquipmentSlot("Weapon", this.inventory);
    this.footgearSlot = new EquipmentSlot("Boots", this.inventory);
    this.garmentSlot = new EquipmentSlot("Garment", this.inventory);
    this.shieldSlot = new EquipmentSlot("Shield", this.inventory);
    this.lowerHelmetSlot = new EquipmentSlot("LowerHelmet", this.inventory);
    this.midderHelmetSlot = new EquipmentSlot("MidderHelmet", this.inventory);
    this.upperHelmetSlot = new EquipmentSlot("UpperHelmet", this.inventory);
    this.accessorySlots = [
      new EquipmentSlot("Accessory 1", this.inventory),
      new EquipmentSlot("Accessory 2", this.inventory),
    ];

    this.exp = 0; // Comenzamos con 0 experiencia
    this.baseLevel = 1; // Y en el nivel 1
    this.jobLevel = 1;
    this.skillPoints = 0;
    this.passiveSkills = [];

    // Puntos de vida
    this.health = vit * 100 + (baseLevel - 1) * 100;

    // Puntos de maná
    this.mana = int * 100 + (baseLevel - 1) * 100;

    // Ataque
    this.strength = str * (baseLevel - 1) * 10;

    // Velocidad de ataque
    this.attackSpeed = agi * (baseLevel - 1) * 2;

    // Evasión
    this.evasion = agi * 0.5;

    // Tasa de golpe (HIT)
    this.hitRate = dex * 0.3;

    // Tasa de golpe crítico
    this.criticalRate = luk * 0.3;

    // Defensa
    this.defense = vit * 0.5;

    // Defensa mágica
    this.magicDefense = int * 0.5;
  }

  changeJob(job) {
    this.job = job;
    this.jobLevel = 1;
    this.skillPoints = 0;
    this.passiveSkills = [];
  }

  // Subir de nivel
  levelUp() {
    this.jobLevel++;

    // Y mejoramos nuestras estadísticas
    this.str += 1;
    this.agi += 1;
    this.vit += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;

    console.log(
      `${this.name} subió de nivel! Ahora es nivel ${this.baseLevel}!`
    );

    if (this.jobLevel === 10) {
      this.chooseFirstJobClass();
    }

    if (this.jobLevel >= 40) {
      // Character can gain more skill points beyond Job Level 40
      this.skillPoints++;
    }
  }

  addPassiveSkill(skill) {
    this.passiveSkills.push(skill);
  }

  chooseFirstJobClass() {
    const jobOptions = [
      "Swordman",
      "Mage",
      "Archer",
      "Merchant",
      "Thief",
      "Acolyte",
    ];

    // Implement your logic to display the job options to the player
    // Let the player make their selection and store it in a variable
    const selectedJobIndex = prompt(
      `Choose your first job class:\n\n1. ${jobOptions[0]}\n2. ${jobOptions[1]}\n3. ${jobOptions[2]}\n4. ${jobOptions[3]}\n5. ${jobOptions[4]}\n6. ${jobOptions[5]}\n\nEnter the corresponding number:`
    );

    // Validate the player's selection and call the `changeJob` method
    const selectedJob = jobOptions[selectedJobIndex - 1];

    if (selectedJob) {
      this.changeJob(selectedJob);
    } else {
      console.log("Invalid selection. Please try again.");
    }
  }

  // Al derrotar a un enemigo, ganamos experiencia
  defeatEnemy(enemy) {
    // Por ejemplo, podríamos obtener EXP basado en el nivel del enemigo
    this.exp += enemy.baseLevel * 100;
    console.log(`${this.name} ganó ${enemy.baseLevel * 100} EXP!`);
    this.checkForLevelUp();
  }

  // Verifica si hemos ganado suficiente EXP para subir de nivel
  checkForLevelUp() {
    // Podríamos decir, por ejemplo, que necesitamos 1000 EXP para subir de nivel
    if (this.exp >= 1000) {
      this.levelUp();
    }
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

  // Podríamos definir un método para mostrar las estadísticas del personaje
  showStats() {
    console.log(
      `${this.name} - Nivel ${this.baseLevel} ${this.type}\n` +
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
}

export default Character;
