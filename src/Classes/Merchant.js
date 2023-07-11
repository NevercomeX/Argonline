import Job from "../Job.js";
class Swordman extends Job {
  constructor(name, str, agi, vit, int, dex, luk, endurance) {
    super(name, str, agi, vit, int, dex, luk);
    this.job = "Swordman";
    this.str += 15;
    this.agi += 5;
    this.vit += 10;
    this.int += 0;
    this.dex += 0;
    this.luk += 0;
    this.health += 1000;
    this.mana += 0;
    this.strength += 150;
    this.attackSpeed += 10;
    this.evasion += 5;
    this.hitRate += 3;
    this.criticalRate += 3;
    this.defense += 5;
    this.magicDefense += 5;
    this.exp = 0;
    this.baseLevel = 1;
    this.jobLevel = 1;
    this.skillPoints = 0;
    this.stats.endurance = endurance;
    this.skills.bash = this.bash; // Agregamos la habilidad "bash" a nuestro objeto de habilidades
    this.skillLevels.bash = 1; // Establecemos el nivel inicial de "bash" en 1
    this.skills = {
      ...this.skills,
      "Sword Mastery": {
        level: 0,
        maxLevel: 10,
        description: "Increases ATK by 4~40 with swords and daggers.",
        passive: true,
        stat: "atk",
        increment: 4,
      },
      "Two-Handed Sword Mastery": {
        level: 0,
        maxLevel: 10,
        description: "Increases ATK by 4~40 with two-handed swords.",
        passive: true,
        stat: "atk",
        increment: 4,
      },
      "Increase HP Recovery": {
        level: 0,
        maxLevel: 10,
        description:
          "Increases HP Recovery while not moving. Also increases efficiency of Healing Items (HP) and Alchemist's Aid Potion by 10~100%.",
        passive: true,
        stat: "hpRecovery",
        increment: 10,
      },
    };
  }

  levelUp() {
    super.levelUp(); // Llama a la función levelUp original para incrementar el nivel y la experiencia necesaria
    this.skillPoints += 1; // Añade 1 puntos de habilidad cada vez que el personaje sube de nivel
    console.log(
      `${this.name} has gained 1 skill points and now has ${this.skillPoints} skill points.`
    );
  }

  learnPassiveSkill(skillName) {
    if (this.skillPoints > 0) {
      // Asegura que el personaje tiene suficientes puntos de habilidad para aprender una nueva habilidad
      if (
        this.skills[skillName].passive &&
        this.skills[skillName].level < this.skills[skillName].maxLevel
      ) {
        this.skills[skillName].level += 1;
        this.skillPoints -= 1; // Resta un punto de habilidad cada vez que una habilidad es aprendida
        console.log(
          `${this.name} learned ${skillName} level ${this.skills[skillName].level}.`
        );
      } else if (!this.skills[skillName].passive) {
        console.log(`${skillName} is not a passive skill.`);
      } else if (
        this.skills[skillName].level >= this.skills[skillName].maxLevel
      ) {
        console.log(`${skillName} is already at max level.`);
      }
    } else {
      console.log(`You do not have enough skill points to learn ${skillName}.`);
    }
  }

  bash() {
    console.log(`${this.name} uses Bash!`);
  }

  // ...
}

export default Swordman;
