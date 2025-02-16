import express from "express";
import {
  getEquipment,
  getEquipmentById,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  unequipItem,
  equipItem,
  getEquipmentMenu,
} from "../../Controllers/index.js";

const router = express.Router();

// Obtener todos los equipamientos
router.get("/", async (req, res) => {
  try {
    const equipment = await getEquipment();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el equipamiento" });
  }
});

// Obtener equipamiento por ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const equipment = await getEquipmentById(id);
    if (equipment) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ error: "Equipamiento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el equipamiento" });
  }
});

// Obtener los slots de equipamiento por ID de personaje
router.get("/character/:characterId", async (req, res) => {
  const characterId = Number(req.params.characterId);
  try {
    const equipmentSlots = await getEquipmentSlotsByCharacterId(characterId);
    res.status(200).json(equipmentSlots);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los slots de equipamiento" });
  }
});

// Obtener el menú de equipamiento de un personaje
router.get("/menu/:characterId", async (req, res) => {
  const characterId = Number(req.params.characterId);

  try {
    const menu = await getEquipmentMenu(characterId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el menú de equipamiento" });
  }
});

// Desequipar ítem (se utiliza el parámetro slotType de la URL)
router.put("/:characterId/unequip/:slotType", async (req, res) => {
  const characterId = Number(req.params.characterId);
  const slot = req.params.slotType; // Utilizamos el parámetro de URL
  try {
    await unequipItem(characterId, slot);
    res.status(200).json({ message: "Ítem desequipado correctamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Equipar ítem (los datos se envían en el body)
router.put("/:characterId/equip", async (req, res) => {
  const { characterId } = req.params;
  const { slot, itemId, itemInstanceId } = req.body;
  try {
    await equipItem(characterId, slot, itemId, itemInstanceId);
    res.status(200).json({ message: "Ítem equipado correctamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener el ítem equipado en un slot específico para un personaje
router.get("/:characterId/:slotType", async (req, res) => {
  const characterId = Number(req.params.characterId);
  const slotType = req.params.slotType;
  try {
    const equipmentSlot = await getEquipmentSlotByCharacterIdAndSlot(characterId, slotType);
    if (!equipmentSlot) {
      return res.status(404).json({
        error: `No se encontró equipamiento para el personaje ${characterId} en el slot ${slotType}`,
      });
    }
    res.status(200).json(equipmentSlot);
  } catch (error) {
    console.error(`Error obteniendo equipamiento para personaje ${characterId} en slot ${slotType}:`, error);
    res.status(500).json({ error: `Error al obtener equipamiento: ${error.message}` });
  }
});

export default router;
