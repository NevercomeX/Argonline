import express from "express";
// import {
//   createItemInstance,
//   getItemInstanceById,
//   getItemInstancesByCharacterId,
//   updateItemInstance,
//   deleteItemInstance,
// } from "../../Controllers/index";

const router = express.Router();

// Routes commented out due to missing controller functions
/*
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
...
*/

export default router;
