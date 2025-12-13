import express from "express";
import {
  getEnemies,
  getEnemyById,
  getRandomEnemy,
} from "../../Controllers/index";

const router: any = express.Router();

// Ruta para obtener todos los enemigos con paginación
router.get("/", async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1; // Página actual, por defecto es 1
  const pageSize = parseInt(req.query.pageSize) || 9; // Tamaño de página, por defecto es 10

  try {
    const { enemies, totalEnemies } = await getEnemies(page, pageSize);
    const totalPages = Math.ceil(totalEnemies / pageSize); // Calcular el número total de páginas

    res.status(200).json({
      monsters: enemies,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los enemigos" });
  }
});

// Ruta para obtener un enemigo por su ID
router.get("/:id", async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const enemy = await getEnemyById(id);
    if (enemy) {
      res.status(200).json(enemy);
    } else {
      res.status(404).json({ error: "Enemigo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el enemigo" });
  }
});

// Ruta para obtener un enemigo aleatorio
router.get("/random", async (req: any, res: any) => {
  try {
    const randomEnemy = await getRandomEnemy();
    res.status(200).json(randomEnemy);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un enemigo aleatorio" });
  }
});

export default router as any;
