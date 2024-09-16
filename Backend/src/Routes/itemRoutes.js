import express from "express";
import {
  getAllItems,
  getItemsById,
  getItemNameById,
} from "../Controllers/index.js";

const router = express.Router();

// Ruta para obtener todos los ítems
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Obtener el número de página desde query params
    const limit = parseInt(req.query.limit) || 10; // Limitar ítems por página
    const data = await getAllItems(page, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los ítems" });
  }
});


// Ruta para obtener un ítem por su ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await getItemsById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Ítem no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el ítem" });
  }
});

// Ruta para obtener el nombre de un ítem por su ID
router.get("/name/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const itemName = await getItemNameById(id);
    res.status(200).json({ name: itemName });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el nombre del ítem" });
  }
});

export default router;
