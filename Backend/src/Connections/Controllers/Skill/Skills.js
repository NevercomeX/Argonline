import { prisma } from "../../../Prisma/prismaClient.js";

export async function getAvailableSkills(characterId) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { jobclass: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    const availableSkills = await prisma.skill.findMany({
      where: {
        jobclassId: character.jobclassId,
        requiredLevel: { lte: character.baseLevel },
      },
      include: {
        skillTree: true,
      },
    });

    return availableSkills;
  } catch (error) {
    console.error("Error al obtener las habilidades disponibles:", error);
    throw error;
  }
}

export async function getSkillTreeByJobClassId(jobclassId) {
  try {
    const skillTree = await prisma.skillTree.findMany({
      where: { jobclassId: parseInt(jobclassId) },
      include: { skill: true },
    });
    return skillTree;
  } catch (error) {
    console.error("Error al obtener el árbol de habilidades:", error);
    throw error;
  }
}

export async function levelUpCharacterSkill(characterId, skillId) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { characterSkills: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(skillId) },
    });

    if (!skill) {
      throw new Error("Habilidad no encontrada");
    }

    const characterSkill = await prisma.characterSkill.findFirst({
      where: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
      },
    });

    if (!characterSkill) {
      throw new Error("El personaje no ha aprendido esta habilidad");
    }

    if (characterSkill.level >= skill.maxLevel) {
      throw new Error("La habilidad ya está al máximo nivel");
    }

    if (character.skillPoints < skill.spCost) {
      throw new Error("Puntos de habilidad insuficientes");
    }

    const updatedCharacterSkill = await prisma.characterSkill.update({
      where: { id: characterSkill.id },
      data: { level: characterSkill.level + 1 },
      include: { skill: true }, // Incluir la relación con Skill
    });

    await prisma.character.update({
      where: { id: parseInt(characterId) },
      data: { skillPoints: character.skillPoints - skill.spCost },
    });

    return updatedCharacterSkill;
  } catch (error) {
    console.error("Error al subir de nivel la habilidad:", error);
    throw error;
  }
}

export async function resetCharacterSkills(characterId) {
  try {
    // Obtener el personaje y sus habilidades
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { characterSkills: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    // Calcular el total de puntos de habilidad gastados
    const totalSpent = character.characterSkills.reduce((sum, skill) => sum + skill.level, 0);

    // Eliminar todas las habilidades del personaje
    await prisma.characterSkill.deleteMany({
      where: { characterId: parseInt(characterId) },
    });

    // Devolver los puntos de habilidad al personaje
    await prisma.character.update({
      where: { id: parseInt(characterId) },
      data: { skillPoints: character.skillPoints + totalSpent },
    });

    return { message: "Todos los puntos de habilidades han sido reasignados" };
  } catch (error) {
    console.error("Error al reasignar los puntos de habilidades:", error);
    throw error;
  }
}

export async function learnCharacterSkill(characterId, skillId) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { jobclass: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(skillId) },
    });

    if (!skill) {
      throw new Error("Habilidad no encontrada");
    }

    if (character.baseLevel < skill.requiredLevel) {
      throw new Error("Nivel base insuficiente para aprender esta habilidad");
    }

    const existingSkill = await prisma.characterSkill.findFirst({
      where: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
      },
    });

    if (existingSkill) {
      throw new Error("El personaje ya ha aprendido esta habilidad");
    }

    const newCharacterSkill = await prisma.characterSkill.create({
      data: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
        level: 1,
      },
      include: { skill: true }, // Incluir la relación con Skill
    });

    return newCharacterSkill;
  } catch (error) {
    console.error("Error al aprender la habilidad:", error);
    throw error;
  }
}

