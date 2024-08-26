import { prisma } from "../../Prisma/prismaClient.js";

export async function getCharacterById(id) {
  return await prisma.character.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function updateCharacter(id, data) {
  return await prisma.character.update({
    where: { id: parseInt(id) },
    data: data,
  });
}
export async function getCharacterStats(id) {
  return await prisma.character.findUnique({
    where: { id: parseInt(id) },
    include: { 
      str: true, 
      agi: true, 
      int: true, 
      vit: true, 
      dex: true, 
      luk: true, 
      baseLevel: true, 
      jobLevel: true, 
      baseExp: true, 
      jobExp: true, 
      maxBaseExp: true, 
      maxJobExp: true, 
      skillPoints: true, 
      health: true, 
      maxHealth: true, 
      maxMana: true, 
      mana: true, 
      attackPower: true, 
      magicPower: true, 
      defense: true, 
      magicDefense: true 
    },
  });
}
