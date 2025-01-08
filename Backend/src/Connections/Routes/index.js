import express from "express";

import { getRoutes } from "../Middleware/getRoutes.js";

import characterRoutes from "./gameRoutes/characterRoutes.js";
import itemRoutes from "./gameRoutes/itemRoutes.js";
import equipmentRoutes from "./gameRoutes/equipmentRoutes.js";
import inventoryRoutes from "./gameRoutes/inventoryRoutes.js";
import itemInstanceRoutes from "./gameRoutes/itemInstanceRoutes.js";
import enemiesRoutes from "./gameRoutes/enemiesRoutes.js";
import userRouters from "./gameRoutes/userRouter.js";

import authRouter from "./authRoutes/authRouter.js";
import adminRoute from "./authRoutes/users/admin.js";
import loginRoute from "./authRoutes/users/login.js";
import getUsers from "./authRoutes/users/users.js";
import getSession from "./authRoutes/session/get-session.js";
import refreshSession from "./authRoutes/session/refresh-session.js";
import verifySession from "./authRoutes/session/verify-session.js";

const router = express.Router();

// Routes para los diferentes recursos de usuarios
router.use("/users", userRouters);

router.use("/auth", authRouter);
router.use("/authV2/admin", adminRoute);
router.use("/authV2/login", loginRoute);
router.use("/authV2/users", getUsers);
router.use("/authV2/get-session", getSession);
router.use("/authV2/refresh-session", refreshSession);
router.use("/authV2/verify-session", verifySession);

// Character routes
router.use("/characters", characterRoutes);

// Items routes
router.use("/items", itemRoutes);

// Equipment routes
router.use("/equipment", equipmentRoutes);

// Item instances routes
router.use("/item-instances", itemInstanceRoutes);

// Inventory routes
router.use("/inventory", inventoryRoutes);

// Enemies routes
router.use("/mobs", enemiesRoutes);

router.get("/routes", (req, res) => {
  const routes = getRoutes(router); // Obtenemos todas las rutas registradas
  res.json(routes); // Devolvemos las rutas en formato JSON
});

export default router;
