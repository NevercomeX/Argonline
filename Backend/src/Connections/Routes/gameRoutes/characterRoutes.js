import express from "express";
import {
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  getCharactersByUserId,
  createCharacterWithAttributes,
} from "../../Controllers/index.js";

const router = express.Router();

// Obtener todos los personajes de un usuario con paginación
router.get("/:userId/characters", async (req, res) => {
  const { userId } = req.params;
  const { page } = req.query; // Obtener el número de página de la query string

  try {
    // Llamar al controlador con la página y el userId
    const characters = await getCharactersByUserId(userId, page);
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
    res.status(500).json({ error: "Error al obtener los personajes" });
  }
});

// Endpoint para obtener todos los personajes
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Obtener el número de página desde query params
    const limit = parseInt(req.query.limit) || 9; // Limitar personajes por página
    const data = await getAllCharacters(page, limit);
    res.status(200).json(data);
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

//create character with attributes

router.post("/:userId/characters", async (req, res) => {
  const { userId } = req.params;
  const { name, jobClass, attributes, gender } = req.body;
  try {
    const newCharacter = await createCharacterWithAttributes(userId, name, jobClass, attributes, gender);
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el personaje" });
  }
});

export default router;
