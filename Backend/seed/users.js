export async function userSeed(prisma) {
  const users = [
    {
      username: "admin",
      email: "admin@ragnarokonline.com",
      password: "admin", // Esta es solo una representación, se debería usar un hash de la contraseña
      role: "admin",
    },
    {
      username: "user",
      email: "user@ragnarokonline.com",
      password: "user", // Esta es solo una representación, se debería usar un hash de la contraseña
      role: "user",
    },
  ];

  for (const user of users) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username: user.username },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: user,
        });

      } else {
        console.log(`User ${user.username} already exists. ✅`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error);
    }
  }

  await prisma.$disconnect();
}
