export async function userSeed(prisma) {
  const user = [
    {
      username: "admin",
      email: "admin@ragnarokonline.com ",
      password: "admin",
      role: "admin",
      Character: {
        id: 1,
      },
    },
    {
      username: "user",
      email: "user@ragnarokonline.com",
      password: "user",
      role: "user",
      Character: {
        id: 2,
      },
    },
  ];

  for (const u of user) {
    const existingUser = await prisma.user.findUnique({
      where: { username: u.username },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: u,
      });
      console.log(`User ${u.username} created.✅`);
    } else {
      console.log(`User ${u.username} already exists. ✅`);
    }
  }
}
