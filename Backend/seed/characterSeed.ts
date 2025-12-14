// character.js
import { prisma, JobName } from "../src/prismaClient/prismaClient";

export async function characterSeed() {
  // First, get the actual users from the database
  const adminUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  const normalUser = await prisma.user.findUnique({
    where: { username: "user" },
  });

  console.log("Admin user found:", adminUser ? `ID ${adminUser.id}` : "NOT FOUND");
  console.log("Normal user found:", normalUser ? `ID ${normalUser.id}` : "NOT FOUND");

  if (!adminUser || !normalUser) {
    console.error("Users not found! Make sure userSeed has run successfully.");
    return;
  }

  // Lista de personajes para agregar
  const characters = [
    {
      name: "Fulanito",
      userId: adminUser.id, // Use actual ID from database
      jobclass: JobName.ASSASSIN, // Valor válido del enum JobName
      str: 1,
      agi: 1,
      vit: 1,
      int: 1,
      dex: 1,
      luk: 1,
      baseLevel: 1,
      jobLevel: 1,
      baseExp: BigInt(0),
      jobExp: BigInt(0),
      health: 100,
      maxHealth: 100,
      maxMana: 10,
      mana: 10,
      // Los demás campos toman sus valores por defecto
    },
    {
      name: "Menganito",
      userId: normalUser.id, // Use actual ID from database
      jobclass: JobName.SWORDSMAN, // Por ejemplo, otro valor válido del enum
      str: 2,
      agi: 2,
      vit: 2,
      int: 2,
      dex: 2,
      luk: 2,
      baseLevel: 5,
      jobLevel: 3,
      baseExp: BigInt(200),
      jobExp: BigInt(50),
      health: 150,
      maxHealth: 150,
      maxMana: 20,
      mana: 20,
    },
    // Puedes agregar más personajes aquí
  ];

  for (const character of characters) {
    try {
      // Verificar si el personaje ya existe
      const existingCharacter = await prisma.character.findUnique({
        where: { name: character.name },
      });

      if (!existingCharacter) {
        // Crear el personaje si no existe
        await prisma.character.create({
          data: character,
        });
      } else {
        console.log(`Character ${character.name} already exists. ✅`);
      }
    } catch (error) {
      console.error(`Error creating character ${character.name}:`, error);
    }
  }
}
