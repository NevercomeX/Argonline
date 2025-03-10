import express from "express";
import { purchaseItem, sellItem, getShopItems } from "../../Controllers/index.js";

const router = express.Router();

// Endpoint para comprar ítems
router.post("/purchase", async (req, res) => {

  console.log(req.body);
  try {
    // Se espera recibir en el body: { characterId, itemId, quantity }
    const result = await purchaseItem(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error al procesar la compra" });
  }
});

// Endpoint para vender ítems
router.post("/sell", async (req, res) => {
  console.log(req.body);
  try {
    // Se espera recibir en el body: { characterId, inventoryItemId, quantity }
    const result = await sellItem(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error al procesar la venta" });
  }
});

// Endpoint para obtener la lista de ítems en la tienda
router.get("/items", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // paginación
    const limit = parseInt(req.query.limit) || 12;
    const data = await getShopItems(page, limit);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en /shop/items:", error);
    res.status(500).json({ error: "Error al obtener la lista de ítems en la tienda" });
  }
});

export default router;
