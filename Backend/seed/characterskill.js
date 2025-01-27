export async function characterSkillSeed(prisma) {
  const characterSkills = [
    // Character 1 (Novice)
    { characterId: 1, skillId: 1, level: 1 }, // Basic Attack
    { characterId: 1, skillId: 2, level: 1 }, // Novice Heal

  ];

  for (const characterskill of characterSkills) {
    await prisma.characterSkill.create({ data: characterskill });
  }
}