import cliProgress from "cli-progress";
import { prisma, JobName, ElementType } from "../src/prismaClient/prismaClient";

export async function skillSeed() {
  const JOB_CLASSES = Object.keys(JobName) as JobName[];

  // Generamos 5 skills para cada jobclass
  const skills = JOB_CLASSES.flatMap(job => {
    return Array.from({ length: 5 }, (_, index) => ({
      name: `${job} Skill ${index + 1}`,
      description: `Descripción de ${job} Skill ${index + 1}`,
      job: job,              // Job asignado a la skill
      level: 1,              // Nivel inicial de la skill
      maxLevel: 10,          // Nivel máximo que puede alcanzar la skill
      spCost: 10 * (index + 1),  // Costo en SP escalable (ejemplo)
      hpCost: 0,             // Costo en HP, en este ejemplo se deja en 0
      castTime: 0.5 * (index + 1), // Tiempo de lanzamiento escalable
      cooldown: 2 * (index + 1),   // Tiempo de reutilización escalable
      target: "Enemy",       // Objetivo de la skill (puede ser "Enemy", "Self", etc.)
      range: (job === "MAGE" || job === "WIZARD") ? 3 : 1, // Ejemplo: skills mágicas tienen mayor rango
      area: 0,               // Área de efecto (0 para habilidades de un solo objetivo)
      element: (job === JobName.MAGE || job === JobName.WIZARD) ? ElementType.FIRE : ElementType.NEUTRAL // Asigna un elemento según el job
    }));
  });

  // Configuramos la barra de progreso para el seeder de skills
  const progressBar = new cliProgress.SingleBar({
    format: 'Skill Seeding |{bar}| {percentage}% | {value}/{total} Skills',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  progressBar.start(skills.length, 0);

  let count = 0;
  for (const skill of skills) {
    try {
      const existingSkill = await prisma.skill.findUnique({ where: { name: skill.name } });
      if (!existingSkill) {
        await prisma.skill.create({ data: skill });
      } else {
        console.log(`Skill ${skill.name} already exists. ✅`);
      }
    } catch (error) {
      console.error(`Error creating skill ${skill.name}:`, error);
    }
    count++;
    progressBar.update(count);
  }
  progressBar.stop();
}
