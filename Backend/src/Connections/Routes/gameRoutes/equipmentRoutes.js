import express from "express";
import {
  getEquipment,
  getEquipmentById,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  unequipItem,
  equipItem,
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
  const id = parseInt(req.params.id);
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
  const characterId = parseInt(req.params.characterId);
  try {
    const equipmentSlots = await getEquipmentSlotsByCharacterId(characterId);
    res.status(200).json(equipmentSlots);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los slots de equipamiento" });
  }
});

// Desequipar ítem
router.put("/:characterId/unequip/:slotType", async (req, res) => {
  const { characterId, slot } = req.body;
  try {
    await unequipItem(characterId, slot);
    res.status(200).json({ message: "Ítem desequipado correctamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Equipar ítem
router.put("/:characterId/equip", async (req, res) => {
  const { characterId, slot, itemId, itemInstanceId } = req.body;
  try {
    await equipItem(characterId, slot, itemId, itemInstanceId);
    res.status(200).json({ message: "Ítem equipado correctamente." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para obtener el equipo en un slot específico para un personaje
router.get("/:characterId/:slotType", async (req, res) => {
  const { characterId, slotType } = req.params;

  try {
    const equipmentSlot = await getEquipmentSlotByCharacterIdAndSlot(
      characterId,
      slotType,
    );

    if (!equipmentSlot) {
      return res
        .status(404)
        .json({
          error: `No equipment found for character ${characterId} in slot ${slotType}`,
        });
    }

    res.status(200).json(equipmentSlot);
  } catch (error) {
    console.error(
      `Error fetching equipment slot for character ${characterId} in slot ${slotType}:`,
      error,
    );
    res
      .status(500)
      .json({ error: `Error fetching equipment slot: ${error.message}` });
  }
});

export default router;