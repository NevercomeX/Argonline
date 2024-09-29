import express from "express";
import {
  getInventory,
  getInventoryById,
  addItemToInventory,
  removeItemFromInventory,
  getCharacterInventory,
} from "../Controllers/index.js";

const router = express.Router();

// Obtener inventario completo de un personaje
router.get("/:characterId", async (req, res) => {
  const characterId = parseInt(req.params.characterId);
  try {
    const inventory = await getInventory(characterId);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el inventario" });
  }
});

// Obtener ítem específico del inventario por ID
router.get("/item/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const inventoryItem = await getInventoryById(id);
    if (inventoryItem) {
      res.status(200).json(inventoryItem);
    } else {
      res.status(404).json({ error: "Ítem no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el ítem del inventario" });
  }
});

// Añadir un ítem al inventario
router.post("/:characterId/add", async (req, res) => {
  const { itemId, quantity } = req.body;
  const characterId = parseInt(req.params.characterId);
  try {
    await addItemToInventory(characterId, itemId, quantity);
    res.status(200).json({
      message: `Ítem añadido al inventario del personaje ${characterId}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al añadir ítem al inventario: ${error.message}` });
  }
});

// Remover un ítem del inventario
router.post("/:characterId/remove", async (req, res) => {
  const { itemId, quantity } = req.body;
  const characterId = parseInt(req.params.characterId);
  try {
    await removeItemFromInventory(characterId, itemId, quantity);
    res.status(200).json({
      message: `Ítem eliminado del inventario del personaje ${characterId}`,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error al eliminar ítem del inventario: ${error.message}`,
    });
  }
});

// Obtener el inventario completo de un personaje por ID
router.get("/character/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const characterInventory = await getCharacterInventory(id);
    res.status(200).json(characterInventory);
  } catch (error) {
    res.status(500).json({
      error: `Error al obtener el inventario del personaje: ${error.message}`,
    });
  }
});

export default router;

// GET /api/inventory/:characterId: Devuelve el inventario completo del personaje especificado por characterId.
// GET /api/inventory/item/:id: Devuelve un ítem específico del inventario por su id.
// POST /api/inventory/:characterId/add: Añade un ítem al inventario del personaje con characterId. Los parámetros itemId y quantity vienen en el cuerpo de la solicitud.
// POST /api/inventory/:characterId/remove: Elimina una cantidad específica de un ítem del inventario del personaje. El itemId y quantity se pasan en el cuerpo.
// GET /api/inventory/character/:id: Obtiene el inventario completo del personaje especificado.
