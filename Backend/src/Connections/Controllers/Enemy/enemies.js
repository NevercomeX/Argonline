import { prisma } from "../../../Prisma/prismaClient.js";

// Función para obtener enemigos con paginación
export async function getEnemies(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize; // Calcular el número de registros a omitir
  const take = pageSize; // Número de registros a obtener

  // Obtener enemigos con paginación
  const enemies = await prisma.enemy.findMany({
    skip,
    take
  });

  // Obtener el número total de enemigos para calcular las páginas
  const totalEnemies = await prisma.enemy.count();

  return {
    enemies,
    totalEnemies
  };
}

export async function getEnemyById(id) {
  return await prisma.enemy.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

export async function getRandomEnemy() {
  const enemies = await getEnemies();
  const randomIndex = Math.floor(Math.random() * enemies.enemies.length);
  return enemies.enemies[randomIndex];
}
