import { prisma } from "../../Prisma/prismaClient.js";

export async function getAllCharacters(){
  return await prisma.character.findMany();
}

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
