import express from "express";
import {
  getAllCharacters,
  getCharacterById,
  updateCharacter,
} from "../Controllers/index.js";

const router = express.Router();

// Endpoint para obtener todos los personajes
router.get("/", async (req, res) => {
  try {
    const characters = await getAllCharacters();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// Endpoint para obtener un personaje por ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const character = await getCharacterById(id);
    if (character) {
      res.status(200).json(character);
    } else {
      res.status(404).json({ error: "Personaje no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el personaje" });
  }
});

// Endpoint para actualizar un personaje por ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedCharacter = await updateCharacter(id, data);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el personaje" });
  }
});

export default router;
