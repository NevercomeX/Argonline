import express from "express";
import { registerUser } from "../../Controllers/index";

const router = express.Router();


// Ruta para registrar un usuario
router.post("/", async (req, res) => {  
  const { username, password, email } = req.body;
  try {
    const newUser = await registerUser(username, password, email);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ error: "Error registrando usuario" });
  }
});

export default router;
