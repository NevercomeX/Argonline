import express from "express";
import characterRoutes from "./characterRoutes.js";
import itemRoutes from "./itemRoutes.js"; // Importa las nuevas rutas
import equipmentRoutes from "./equipmentRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
import itemInstanceRoutes from "./itemInstanceRoutes.js";

const router = express.Router();

// Monta las rutas
router.use("/characters", characterRoutes);
router.use("/items", itemRoutes);
router.use("/item-instances", itemInstanceRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/inventory", inventoryRoutes);

export default router;
