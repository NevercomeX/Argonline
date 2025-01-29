import { prisma } from "../../../Prisma/prismaClient.js";

export async function getAvailableSkills(characterId) {
  try {
    // Obtener el personaje y su JobClass
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { jobclass: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    // Obtener las habilidades disponibles para la JobClass del personaje
    const availableSkills = await prisma.skill.findMany({
      where: {
        jobclassId: character.jobclassId,
        requiredLevel: { lte: character.baseLevel }, // Solo habilidades con nivel requerido <= al nivel del personaje
      },
      include: {
        skillTree: true, // Incluir información del árbol de habilidades
      },
    });

    return availableSkills;
  } catch (error) {
    console.error("Error al obtener las habilidades disponibles:", error);
    throw error;
  }
}

//getSkillTreeByJobClassId on skilltree table just the skills tree for a specific jobclass
export async function getSkillTreeByJobClassId(characterId) {
  try {
    // Obtener el árbol de habilidades para la JobClass
const characterSkills = await prisma.characterSkill.findMany({
  where: { characterId: parseInt(characterId) },
  include: { skill: true }, // Incluir la relación con Skill
});
    return characterSkills;
  }
  catch (error) {
    console.error("Error al obtener el árbol de habilidades:", error);
    throw error;
  }
}


export async function levelUpCharacterSkill(characterId, skillId) {
  try {
    // Obtener el personaje y su habilidad actual
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

    // Verificar si el personaje ya tiene la habilidad
    const characterSkill = await prisma.characterSkill.findFirst({
      where: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
      },
    });

    if (!characterSkill) {
      throw new Error("El personaje no ha aprendido esta habilidad");
    }

    // Verificar si la habilidad ya está al máximo nivel
    if (characterSkill.level >= skill.maxLevel) {
      throw new Error("La habilidad ya está al máximo nivel");
    }

    // Verificar si el personaje tiene suficientes puntos de habilidad
    if (character.skillPoints < skill.spCost) {
      throw new Error("Puntos de habilidad insuficientes");
    }

    // Subir de nivel la habilidad
    const updatedCharacterSkill = await prisma.characterSkill.update({
      where: { id: characterSkill.id },
      data: { level: characterSkill.level + 1 },
    });

    // Reducir los puntos de habilidad del personaje
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
    // Obtener el personaje y su JobClass
    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
      include: { jobclass: true },
    });

    if (!character) {
      throw new Error("Personaje no encontrado");
    }

    // Obtener la habilidad que se desea aprender
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(skillId) },
    });

    if (!skill) {
      throw new Error("Habilidad no encontrada");
    }

    // Verificar si el personaje cumple con los requisitos
    if (character.baseLevel < skill.requiredLevel) {
      throw new Error("Nivel base insuficiente para aprender esta habilidad");
    }

    // Verificar si el personaje ya tiene la habilidad
    const existingSkill = await prisma.characterSkill.findFirst({
      where: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
      },
    });

    if (existingSkill) {
      throw new Error("El personaje ya ha aprendido esta habilidad");
    }

    // Aprender la habilidad
    const newCharacterSkill = await prisma.characterSkill.create({
      data: {
        characterId: parseInt(characterId),
        skillId: parseInt(skillId),
        level: 1, // Nivel inicial
      },
    });

    return newCharacterSkill;
  } catch (error) {
    console.error("Error al aprender la habilidad:", error);
    throw error;
  }
}

