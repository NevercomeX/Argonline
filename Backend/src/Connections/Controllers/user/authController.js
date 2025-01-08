// src/Controllers/authController.js
import { prisma } from "../../../Prisma/prismaClient.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "somethingsomething";

// Registrar usuario (con cifrado de contraseña)
export async function registerUser(username, password, email) {
  console.log("Datos recibidos:", username, password, email);

  try {
    // Hashear la contraseña con Argon2
    const hashedPassword = await argon2.hash(password);
    console.log("Contraseña hasheada:", hashedPassword);

    // Crear nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    console.log("Nuevo usuario creado:", newUser);

    return newUser; // Retorna el nuevo usuario creado
  } catch (error) {
    console.error("Error en la base de datos o hash:", error.message);
    throw new Error("Error registrando usuario");
  }
}

// Iniciar sesión (Login)
export async function loginUser(email, password) {

  try {
    // Buscar el usuario por nombre de usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar la contraseña con Argon2
    const isValidPassword = await argon2.verify(user.password, password);
    console.log("Contraseña válida:", isValidPassword);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token válido por 1 hora
      },
    );
    console.log("===================final de authcontroller.js====================");
    console.log("Token generado:", token);
    console.log("Usuario validado:", user);

    return { token, user };
  } catch (error) {
    throw new Error(error.message);
  }
}