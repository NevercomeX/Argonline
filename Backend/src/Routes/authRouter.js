import express from 'express';
import { loginUser, registerUser } from '../Controllers/index.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser(email, password);

    // Configurar la cookie HTTP-only con el token
    res.cookie('token', token, {
      httpOnly: true, // Evita que el token sea accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo enviar sobre HTTPS en producción
      sameSite: 'strict', // Solo enviar la cookie en el mismo dominio
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.status(200).json({ user }); // Enviar datos del usuario, pero no el token
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await registerUser(username, password, email);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return res.status(500).json({ error: "Error registrando usuario" });
  }
});

export default router;
