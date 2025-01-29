import express from "express";
import {
  getAvailableSkills,
  levelUpCharacterSkill,
  resetCharacterSkills,
  learnCharacterSkill,
  getSkillTreeByJobClassId
} from "../../Controllers/index.js";

const router = express.Router();

// Ruta para mostrar habilidades disponibles
router.get("/characterskill/:characterId/skills", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const availableSkills = await getAvailableSkills(characterId);
    res.status(200).json(availableSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener Skilltree by jobclass
router.get("/characterskill/jobclassid/:jobclass", async (req, res) => {
  const jobClass = parseInt(req.params.jobclass, 10);
  try {
    const availableSkills = await getSkillTreeByJobClassId(jobClass);
    res.status(200).json(availableSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para subir de nivel una habilidad
router.post("/characterskill/:characterId/skills/:skillId/level-up", async (req, res) => {
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
router.post("/characterskill/:characterId/skills/reset", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const result = await resetCharacterSkills(characterId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para aprender una nueva habilidad
router.post("/characterskill/:characterId/skills/:skillId/learn", async (req, res) => {
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