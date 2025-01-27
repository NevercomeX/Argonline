export async function skillTreeSeed(prisma) {
  const skillTrees = [
    // Novice Skill Tree (JobClassId: 1)
    { jobclassId: 1, skillId: 1, requiredSkillId: null }, // Basic Attack (no requiere habilidad previa)
    { jobclassId: 1, skillId: 2, requiredSkillId: 1 },    // Novice Heal (requiere Basic Attack)
    { jobclassId: 1, skillId: 3, requiredSkillId: 2 },    // First Aid (requiere Novice Heal)
    { jobclassId: 1, skillId: 4, requiredSkillId: 3 },    // Guard (requiere First Aid)
    { jobclassId: 1, skillId: 5, requiredSkillId: 4 },    // Improve Concentration (requiere Guard)

    // Swordsman Skill Tree (JobClassId: 2)
    { jobclassId: 2, skillId: 6, requiredSkillId: null }, // Bash (no requiere habilidad previa)
    { jobclassId: 2, skillId: 7, requiredSkillId: 6 },    // Provoke (requiere Bash)
    { jobclassId: 2, skillId: 8, requiredSkillId: 7 },    // Endure (requiere Provoke)
    { jobclassId: 2, skillId: 9, requiredSkillId: 8 },    // Magnum Break (requiere Endure)
    { jobclassId: 2, skillId: 10, requiredSkillId: 9 },   // Sword Mastery (requiere Magnum Break)

    // Archer Skill Tree (JobClassId: 3)
    { jobclassId: 3, skillId: 11, requiredSkillId: null }, // Double Strafe (no requiere habilidad previa)
    { jobclassId: 3, skillId: 12, requiredSkillId: 11 },   // Arrow Shower (requiere Double Strafe)
    { jobclassId: 3, skillId: 13, requiredSkillId: 12 },   // Arrow Crafting (requiere Arrow Shower)
    { jobclassId: 3, skillId: 14, requiredSkillId: 13 },   // Focused Arrow Strike (requiere Arrow Crafting)
    { jobclassId: 3, skillId: 15, requiredSkillId: 14 },   // Vulture's Eye (requiere Focused Arrow Strike)

    // Mage Skill Tree (JobClassId: 4)
    { jobclassId: 4, skillId: 16, requiredSkillId: null }, // Fire Bolt (no requiere habilidad previa)
    { jobclassId: 4, skillId: 17, requiredSkillId: 16 },   // Cold Bolt (requiere Fire Bolt)
    { jobclassId: 4, skillId: 18, requiredSkillId: 17 },   // Lightning Bolt (requiere Cold Bolt)
    { jobclassId: 4, skillId: 19, requiredSkillId: 18 },   // Energy Coat (requiere Lightning Bolt)
    { jobclassId: 4, skillId: 20, requiredSkillId: 19 },   // Spell Breaker (requiere Energy Coat)

    // Merchant Skill Tree (JobClassId: 5)
    { jobclassId: 5, skillId: 21, requiredSkillId: null }, // Discount (no requiere habilidad previa)
    { jobclassId: 5, skillId: 22, requiredSkillId: 21 },   // Overcharge (requiere Discount)
    { jobclassId: 5, skillId: 23, requiredSkillId: 22 },   // Pushcart (requiere Overcharge)
    { jobclassId: 5, skillId: 24, requiredSkillId: 23 },   // Item Appraisal (requiere Pushcart)
    { jobclassId: 5, skillId: 25, requiredSkillId: 24 },   // Mammonite (requiere Item Appraisal)

    // Thief Skill Tree (JobClassId: 6)
    { jobclassId: 6, skillId: 26, requiredSkillId: null }, // Steal (no requiere habilidad previa)
    { jobclassId: 6, skillId: 27, requiredSkillId: 26 },   // Hiding (requiere Steal)
    { jobclassId: 6, skillId: 28, requiredSkillId: 27 },   // Envenom (requiere Hiding)
    { jobclassId: 6, skillId: 29, requiredSkillId: 28 },   // Detoxify (requiere Envenom)
    { jobclassId: 6, skillId: 30, requiredSkillId: 29 },   // Double Attack (requiere Detoxify)

    // Acolyte Skill Tree (JobClassId: 7)
    { jobclassId: 7, skillId: 31, requiredSkillId: null }, // Heal (no requiere habilidad previa)
    { jobclassId: 7, skillId: 32, requiredSkillId: 31 },   // Blessing (requiere Heal)
    { jobclassId: 7, skillId: 33, requiredSkillId: 32 },   // Increase AGI (requiere Blessing)
    { jobclassId: 7, skillId: 34, requiredSkillId: 33 },   // Decrease AGI (requiere Increase AGI)
    { jobclassId: 7, skillId: 35, requiredSkillId: 34 },   // Cure (requiere Decrease AGI)

    // Super Novice Skill Tree (JobClassId: 8)
    { jobclassId: 8, skillId: 36, requiredSkillId: null }, // Super Heal (no requiere habilidad previa)
    { jobclassId: 8, skillId: 37, requiredSkillId: 36 },   // Super Bash (requiere Super Heal)
    { jobclassId: 8, skillId: 38, requiredSkillId: 37 },   // Super Provoke (requiere Super Bash)
    { jobclassId: 8, skillId: 39, requiredSkillId: 38 },   // Super Endure (requiere Super Provoke)
    { jobclassId: 8, skillId: 40, requiredSkillId: 39 },   // Super Magnum Break (requiere Super Endure)

    // Hunter Skill Tree (JobClassId: 9)
    { jobclassId: 9, skillId: 41, requiredSkillId: null }, // Falcon Assault (no requiere habilidad previa)
    { jobclassId: 9, skillId: 42, requiredSkillId: 41 },   // Blitz Beat (requiere Falcon Assault)
    { jobclassId: 9, skillId: 43, requiredSkillId: 42 },   // Detect (requiere Blitz Beat)
    { jobclassId: 9, skillId: 44, requiredSkillId: 43 },   // Land Mine (requiere Detect)
    { jobclassId: 9, skillId: 45, requiredSkillId: 44 },   // Claymore Trap (requiere Land Mine)

    // Ninja Skill Tree (JobClassId: 11)
    { jobclassId: 11, skillId: 46, requiredSkillId: null }, // Throw Shuriken (no requiere habilidad previa)
    { jobclassId: 11, skillId: 47, requiredSkillId: 46 },   // Shadow Jump (requiere Throw Shuriken)
    { jobclassId: 11, skillId: 48, requiredSkillId: 47 },   // Shadow Slash (requiere Shadow Jump)
    { jobclassId: 11, skillId: 49, requiredSkillId: 48 },   // Venom Dust (requiere Shadow Slash)
    { jobclassId: 11, skillId: 50, requiredSkillId: 49 },   // Illusionary Shadow (requiere Venom Dust)
  ];

  for (const skilltree of skillTrees) {
    await prisma.skillTree.create({ data: skilltree });
  }
}