// src/Character.js

// Efecto de las pociones de HP y SP (talvez )
// Efecto de ítems consumibles (talvez )

import EquipmentSlot from "./Items/EquipmentSlot.js";
import Inventory from "./Items/Inventory.js";

import Job from "./Job.js";

import Acolyte from "./Classes/Acolyte.js";
import Archer from "./Classes/Archer.js";
import Mage from "./Classes/Mage.js";
import Merchant from "./Classes/Merchant.js";
import Swordman from "./Classes/Swordman.js";
import Thief from "./Classes/Thief.js";

const jobs = {
  Swordman,
  Mage,
  Archer,
  Merchant,
  Thief,
  Acolyte,
};

function getJob(name) {
  if (jobs[name]) {
    return new jobs[name]();
  } else {
    return null;
  }
}

export default class Character {
  constructor(name, str, agi, vit, int, dex, luk, job = new Job("Novice", {})) {
    // Atributos básicos
    this.name = name;
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.int = int;
    this.dex = dex;
    this.luk = luk;

    this.job = job;

    // Nivel y experiencia
    this.exp = 0;
    this.baseLevel = 1;
    this.jobLevel = 1;
    this.skillPoints = 0;
    this.passiveSkills = [];

    // Estadísticas
    this.health = vit * 100 + (baseLevel - 1) * 100;
    this.mana = int * 100 + (baseLevel - 1) * 100;
    this.strength = str * (baseLevel - 1) * 10;
    this.attackSpeed = agi * (baseLevel - 1) * 2;
    this.evasion = agi * 0.5;
    this.hitRate = dex * 0.3;
    this.criticalRate = luk * 0.3;
    this.defense = vit * 0.5;
    this.magicDefense = int * 0.5;

    // Inventario
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
  }
  changeJob(newJobName) {
    const newJob = getJob(newJobName);
    if (newJob) {
      this.job = newJob;
      this.jobLevel = 1;
      this.skillPoints = 0;
      this.passiveSkills = [];
      newJob.applyTo(this);
      console.log(`${this.name} is now a ${newJob.name}!`);
    } else {
      console.log(`Sorry, ${newJobName} is not a valid job.`);
    }
  }

  levelUp() {
    this.jobLevel++;
    console.log(
      `${this.name} subió de nivel! Ahora es nivel ${this.baseLevel}!`
    );

    this.str += 1;
    this.agi += 1;
    this.vit += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;

    if (this.jobLevel === 10) {
      this.chooseFirstJobClass();
    }

    if (this.jobLevel >= 40) {
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

    const selectedJobIndex = prompt(
      `Choose your first job class:\n\n1. ${jobOptions[0]}\n2. ${jobOptions[1]}\n3. ${jobOptions[2]}\n4. ${jobOptions[3]}\n5. ${jobOptions[4]}\n6. ${jobOptions[5]}\n\nEnter the corresponding number:`
    );

    const selectedJob = jobOptions[selectedJobIndex - 1];

    if (selectedJob) {
      this.changeJob(selectedJob);
    } else {
      console.log("Invalid selection. Please try again.");
    }
  }

  defeatEnemy(enemy) {
    this.exp += enemy.baseLevel * 100;
    console.log(`${this.name} ganó ${enemy.baseLevel * 100} EXP!`);
    this.checkForLevelUp();
  }

  checkForLevelUp() {
    if (this.exp >= 1000) {
      this.levelUp();
    }
  }

  attack(target) {
    if (target.health > 0) {
      const physicalDamage = this.strength - target.defense;

      const magicalDamage = this.magic - target.magicDefense;

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
    if (Math.random() < this.evasion / 100) {
      console.log(`${this.name} dodged the attack!`);
      return true;
    } else {
      console.log(`${this.name} was hit!`);
      return false;
    }
  }

  attackAndConsiderEvasion(target) {
    if (!target.dodge()) {
      this.attack(target);
    }
  }

  pickup(item) {
    this.inventory.push(item);
    console.log(`${this.name} picked up ${item.name}`);
  }

  use(item) {
    const index = this.inventory.indexOf(item);
    if (index !== -1) {
      this.inventory.splice(index, 1);
      console.log(`${this.name} used ${item.name}`);

      if (item instanceof Armor) {
        this.equipArmor(item);
      }
    } else {
      console.log(`${this.name} doesn't have ${item.name} in the inventory`);
    }
  }

  equipArmor(armor) {
    this.armorSlot.equip(armor);
  }

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
