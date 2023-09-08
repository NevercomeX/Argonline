import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCharacter() {
  const playerData = await prisma.character.findUnique({
    where: { id: 1 },
  });

  return playerData;
}

export async function updateCharacter(data) {
  const playerData = await prisma.character.update({
    where: { id: 1 },
    data: {
      ...data,
    },
  });

  return playerData;
}
