// src/Routes/user.js
import express from "express";
import {
  getAllUsers,
  getAllCharactersFromUser,
  registerUser,
  createCharacter,
} from "../../Controllers/index.js";

import authMiddleware  from "../../Middleware/authMiddleware.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Ruta para obtener todos los personajes de un usuario
router.get("/:id/characters", async (req, res) => {
  const { id } = req.params;
  try {
    const characters = await getAllCharactersFromUser(id);
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Ruta para crear un personaje asociado a un usuario
router.post("/:id/characters", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  const characterData = req.body;
  try {
    const newCharacter = await createCharacter(id, characterData);
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error al crear personaje" });
  }
});

export default router;
