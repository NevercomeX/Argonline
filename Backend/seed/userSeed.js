import argon2 from "argon2"; // Importa Argon2 para el hashing de contraseñas

export async function userSeed(prisma) {
  const users = [
    {
      username: "admin",
      email: "admin@ragnarokonline.com",
      password: "admin", // Contraseña en texto plano (se hasheará antes de guardar)
      role: "admin",
    },
    {
      username: "user",
      email: "user@ragnarokonline.com",
      password: "user", // Contraseña en texto plano (se hasheará antes de guardar)
      role: "user",
    },
  ];

  for (const user of users) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { username: user.username },
      });

      if (!existingUser) {
        // Hashear la contraseña antes de crear el usuario
        const hashedPassword = await argon2.hash(user.password);

        // Crear el usuario con la contraseña hasheada
        await prisma.user.create({
          data: {
            username: user.username,
            email: user.email,
            password: hashedPassword, // Usar la contraseña hasheada
            role: user.role,
          },
        });
      } else {
        console.log(`User ${user.username} already exists. ✅`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error);
    }
  }

  // Nota:
  // Si este seeder es parte de un proceso centralizado de seeding (ejecutado desde index.js),
  // es mejor NO desconectar el PrismaClient aquí, ya que index.js se encargará de ello.
  // await prisma.$disconnect();
}
