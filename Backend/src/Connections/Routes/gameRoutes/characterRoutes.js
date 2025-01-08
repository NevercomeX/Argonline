import express from "express";
import {
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  createCharacter,
  getCharactersByUserId,
} from "../../Controllers/index.js";

const router = express.Router();

// get all characters of user id
router.get("/:userId/characters", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const characters = await getCharactersByUserId(userId);
    res.status(200).json(characters);
  } catch (error) {
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

router.post("/users/:userId/characters", async (req, res) => {
  const { userId } = req.params;
  const { name, jobClass } = req.body;

  try {
    const newCharacter = await createCharacter(userId, name, jobClass);
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el personaje" });
  }
});

export default router;
