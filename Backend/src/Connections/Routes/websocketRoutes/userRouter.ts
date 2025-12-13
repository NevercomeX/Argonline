// src/Routes/user.js
import express from "express";
import {
  getAllUsers,
  getAllCharactersFromUser,
  registerUser,
  createCharacter,
} from "../../Controllers/index";

import authMiddleware  from "../../Middleware/authMiddleware";

const router: any = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req: any, res: any) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Ruta para obtener todos los personajes de un usuario
router.get("/:id/characters", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const characters = await getAllCharactersFromUser(id);
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// Ruta para registrar un nuevo usuario
router.post("/register", async (req: any, res: any) => {
  const userData = req.body;
  try {
    const newUser = await registerUser(userData.username, userData.password, userData.email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Ruta para crear un personaje asociado a un usuario
router.post("/:id/characters", authMiddleware(), async (req: any, res: any) => {
  const { id } = req.params;
  const characterData = req.body;
  try {
    const newCharacter = await createCharacter(id, characterData.name, characterData.jobClass);
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error al crear personaje" });
  }
});

export default router;
