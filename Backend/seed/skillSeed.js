export async function skillSeed(prisma) {
  const skills = [
    {
      name: "Fire Bolt",
      description: "Lanza una serie de bolas de fuego al enemigo.",
      job: "MAGE",
      level: 1,
      maxLevel: 10,
      spCost: 10,
      hpCost: 0,
      castTime: 1.5,
      cooldown: 0.5,
      target: "Enemy",
      range: 9,
      area: 0,
      element: "FIRE",
      requiredSkills: "[]",
      icon: "fire_bolt.png"
    },
    {
      name: "Heal",
      description: "Recupera HP del objetivo.",
      job: "ACOLYTE",
      level: 1,
      maxLevel: 10,
      spCost: 15,
      hpCost: 0,
      castTime: 1.0,
      cooldown: 1.0,
      target: "Ally",
      range: 9,
      area: 0,
      element: "HOLY",
      requiredSkills: "[]",
      icon: "heal.png"
    }
  ];

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
  }
}