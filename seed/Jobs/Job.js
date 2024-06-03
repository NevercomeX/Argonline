class Job {
  constructor(name, skills = {}) {
    this.name = name;

    this.maxJobLevel = 10;
    this.maxBaseLevel = 99;
    this.skills = skills; // Inicialmente vacío, se llenará con los métodos de habilidades.
    this.skillLevels = {}; // Inicialmente vacío, se llenará con los niveles de habilidades.
  }

  learnSkill(skillName) {
    if (!this.skills[skillName]) {
      console.log(`La habilidad ${skillName} no existe.`);
      return;
    }

    this.skillLevels[skillName] = (this.skillLevels[skillName] || 0) + 1;
    console.log(
      `La habilidad ${skillName} ahora está en el nivel ${this.skillLevels[skillName]}.`
    );
  }

  useSkill(skillName, target) {
    if (!this.skills[skillName]) {
      console.log(`La habilidad ${skillName} no existe.`);
      return;
    }

    // Aquí deberías implementar la lógica para usar la habilidad.
    // Esto dependerá de cómo estén implementadas tus habilidades.
    console.log(
      `${this.name} usa la habilidad ${skillName} en ${target.name}.`
    );
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

  applyPassiveEffects() {
    // Aquí deberías implementar la lógica para aplicar los efectos pasivos de las habilidades.
    // Esto dependerá de cómo estén implementadas tus habilidades.
    console.log(`${this.name} aplica los efectos pasivos de sus habilidades.`);
  }
}

export default Job;
