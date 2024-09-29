import express from "express";
import {
  createItemInstance,
  getItemInstanceById,
  getItemInstancesByCharacterId,
  updateItemInstance,
  deleteItemInstance,
} from "../Controllers/index.js";

const router = express.Router();

// Ruta para crear una nueva instancia de ítem
router.post("/", async (req, res) => {
  try {
    const itemData = parseInt(req.body);
    const newItemInstance = await createItemInstance(itemData);
    res.status(201).json(newItemInstance);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la instancia de ítem" });
  }
});

// Ruta para obtener una instancia de ítem por su ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const itemInstance = await getItemInstanceById(id);
    res.status(200).json(itemInstance);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al obtener la instancia de ítem con ID ${id}` });
  }
});

// Ruta para obtener todas las instancias de ítems de un personaje
router.get("/character/:characterId", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const itemInstances = await getItemInstancesByCharacterId(characterId);
    res.status(200).json(itemInstances);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las instancias de ítems" });
  }
});

// Ruta para actualizar una instancia de ítem
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = parseInt(req.body);
  try {
    const updatedItemInstance = await updateItemInstance(id, updateData);
    res.status(200).json(updatedItemInstance);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al actualizar la instancia de ítem con ID ${id}` });
  }
});

// Ruta para eliminar una instancia de ítem
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteItemInstance(id);
    res
      .status(200)
      .json({ message: "Instancia de ítem eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al eliminar la instancia de ítem con ID ${id}` });
  }
});

export default router;
