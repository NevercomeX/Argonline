export async function characterSkillSeed(prisma) {
  const characterSkills = [
    {
      characterId: 1,
      skillId: 1,
      level: 5
    },
    {
      characterId: 2,
      skillId: 2,
      level: 3
    }
  ];

  for (const charSkill of characterSkills) {
    try {
      const existingCharSkill = await prisma.characterSkill.findFirst({
        where: {
          characterId: charSkill.characterId,
          skillId: charSkill.skillId,
        },
      });

      if (!existingCharSkill) {
        await prisma.characterSkill.create({ data: charSkill });
      } else {
        console.log(`CharacterSkill for characterId ${charSkill.characterId} and skillId ${charSkill.skillId} already exists. ✅`);
      }
    } catch (error) {
      console.error(`Error creating CharacterSkill entry:`, error);
    }
  }
}
