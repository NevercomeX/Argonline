// src/Character.js

import EquipmentSlot from "./Items/EquipmentSlot.js";
import Inventory from "./Items/Inventary.js";

import Job from "./Job.js";

import Acolyte from "./Classes/Acolyte.js";
import Archer from "./Classes/Archer.js";
import Mage from "./Classes/Mage.js";
import Merchant from "./Classes/Merchant.js";
import Swordman from "./Classes/Swordman.js";
import Thief from "./Classes/Thief.js";

import Entity from "./Entity.js";

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

export default class Character extends Entity {
  constructor(
    name,
    str,
    agi,
    vit,
    int,
    dex,
    luk,
    job = new Job("Novice", {}),
    inventory = new Inventory()
  ) {
    super(health, mana, attackPower, magicPower, defense, magicDefense);
    // Atributos básicos
    this.name = name;
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.int = int;
    this.dex = dex;
    this.luk = luk;

    this.job = job.name;

    this.attackType = "physical";

    // Nivel y experiencia
    this.baseExp = 0;
    this.jobExp = 0;
    this.maxBaseExp = 100;
    this.maxJobExp = 100;

    this.baseLevel = 1;
    this.jobLevel = 1;
    this.skillPoints = 0;
    this.passiveSkills = [];

    this.isDefending = false;

    // Estadísticas
    // Atributos primarios
    this.health = 1000000;
    this.mana = 100;
    this.maxHealth = 1000000;
    this.maxMana = 100;

    // Atributos secundarios
    this.attackPower = 50;
    this.magicPower = 10;
    this.defense = 5;
    this.magicDefense = 3;

    // Atributos terciarios
    this.attackSpeed = agi * (this.baseLevel - 1) * 2;
    this.evasion = agi * 0.5;
    this.hitRate = dex * 0.3;
    this.criticalRate = luk * 0.3;

    // Inventario
    this.inventory = inventory;
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

  gainExperience(enemyExperience) {
    this.baseExp += enemyExperience.baseExpAmount;
    this.jobExp += enemyExperience.jobExpAmount;
    console.log(`${this.name} ganó ${enemyExperience.baseExpAmount} EXP base!`);
    console.log(
      `${this.name} ganó ${enemyExperience.jobExpAmount} EXP de trabajo!`
    );
    this.levelUp();
  }

  levelUp() {
    // this.jobLevel++;

    this.str += 1;
    this.agi += 1;
    this.vit += 1;
    this.int += 1;
    this.dex += 1;
    this.luk += 1;

    if (this.baseExp >= this.maxBaseExp) {
      this.baseExp = 0; // Restablece la experiencia base
      this.maxBaseExp += 100; // Incrementa la experiencia base máxima
      this.baseLevel += 1; // Incrementa el nivel
      console.log(
        `${this.name} has leveled up! They are now level ${this.baseLevel}.`
      );
    }

    if (this.jobExp >= this.maxJobExp) {
      this.jobExp = 0; // Restablece la experiencia de trabajo
      this.maxJobExp += 100; // Incrementa la experiencia de trabajo máxima
      this.jobLevel += 1; // Incrementa el nivel de trabajo
      console.log(
        `${this.name} has leveled up their job! They are now job level ${this.jobLevel}.`
      );
    }

    // if (this.jobLevel === 10) {
    //   this.chooseFirstJobClass();
    // }

    // if (this.jobLevel >= 40) {
    //   this.skillPoints++;
    // }
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

  physicalAttack(target) {
    let damage = this.attackPower - target.defense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.clear();
    console.log(
      `${this.name} ataca físicamente a ${target.name} por ${damage} de daño.`
    );
    console.log(" ");
    target.health -= damage;
    //vida restante
  }

  magicalAttack(target) {
    let damage = this.magicPower - target.magicDefense;
    if (damage < 0) damage = 0; // El daño no puede ser negativo
    console.log(
      `${this.name} ataca mágicamente a ${target.name} por ${damage} de daño.`
    );
    target.health -= damage;
  }

  defend(target) {
    this.isDefending = true;
  }

  attack(target) {
    if (this.attackType === "physical") {
      this.physicalAttack(target);
    } else if (this.attackType === "magical") {
      this.magicalAttack(target);
    }
  }

  showEquipment() {
    console.log(this.headgearSlot.getInfo());
    console.log(this.armorSlot.getInfo());
    console.log(this.weaponSlot.getInfo());
    console.log(this.footgearSlot.getInfo());
    console.log(this.garmentSlot.getInfo());
    console.log(this.shieldSlot.getInfo());
    console.log(this.lowerHelmetSlot.getInfo());
    console.log(this.midderHelmetSlot.getInfo());
    console.log(this.upperHelmetSlot.getInfo());
    console.log(this.accessorySlots[0].getInfo());
    console.log(this.accessorySlots[1].getInfo());
  }
}
