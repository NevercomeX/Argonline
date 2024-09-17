import express from 'express';
import { loginUser, registerUser } from '../Controllers/index.js'; // Asegúrate de que estos métodos están implementados correctamente

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await loginUser(username, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await registerUser(username, password, email);

    // Si el registro es exitoso, devuelve el usuario registrado
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
