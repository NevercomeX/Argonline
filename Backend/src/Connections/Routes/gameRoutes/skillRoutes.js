import express from "express";
import {
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
} from "../../Controllers/index.js";

const router = express.Router();

// Ruta para mostrar habilidades disponibles
router.get("/:characterId/skills", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const availableSkills = await getAvailableSkills(characterId);
    res.status(200).json(availableSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para subir de nivel una habilidad
router.post("/:characterId/skills/:skillId/level-up", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  const skillId = parseInt(req.params.skillId);
  try {
    const updatedSkill = await levelUpCharacterSkill(characterId, skillId);
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para reasignar todos los puntos de habilidades
router.post("/:characterId/skills/reset", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const result = await resetCharacterSkills(characterId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para aprender una nueva habilidad
router.post("/:characterId/skills/:skillId/learn", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  const skillId = parseInt(req.params.skillId);
  try {
    const newSkill = await learnCharacterSkill(characterId, skillId);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;