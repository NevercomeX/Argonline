// src/Controllers/authController.js
import { prisma } from "../../../Prisma/prismaClient.js";
import argon2 from "argon2";

/**
 * Registra un nuevo usuario, validando campos y evitando duplicados.
 * La contraseña se cifra con Argon2.
 * @param {string} username 
 * @param {string} password 
 * @param {string} email 
 * @returns {Promise<object>} El usuario creado
 */
export async function registerUser(username, password, email) {
  try {
    // Validar que se reciban todos los campos
    if (!username || !email || !password) {
      throw new Error("Todos los campos son obligatorios.");
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    // Verificar si el usuario o correo ya existen
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existingUser) {
      throw new Error("El usuario o correo ya están registrados.");
    }

    // Hashear la contraseña
    const hashedPassword = await argon2.hash(password);

    // Crear el usuario en la DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error registrando usuario:", error.message);
    throw new Error("Error registrando usuario");
  }
}

/**
 * Inicia sesión validando credenciales.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user: object}>}
 */
export async function loginUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos.");
    }
    email = email.trim().toLowerCase();

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar la contraseña
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    return { user };
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    throw new Error(error.message);
  }
}
