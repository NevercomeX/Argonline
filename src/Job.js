import Character from "./Character.js";

class Job extends Character {
  constructor(name, str, agi, vit, int, dex, luk) {
    super(name, str, agi, vit, int, dex, luk);
    this.skills = {}; // Inicialmente vacío, se llenará con los métodos de habilidades.
    this.skillLevels = {}; // Inicialmente vacío, se llenará con los niveles de habilidades.
  }

  showSkills() {
    console.log(`Habilidades de ${this.name}:`);
    for (const skill in this.skills) {
      console.log(`${skill}: Nivel ${this.skillLevels[skill]}`);
    }
  }

  // Aquí puedes agregar los métodos específicos de Job.
  // Por ejemplo, un método para agregar una skill:
  addSkill(skill) {
    this.skills.push(skill);
    console.log(`${this.name} learned a new skill: ${skill}!`);
  }
}

export default Job;
