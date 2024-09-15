import express from "express";
import routes from "./src/Routes/index.js";
import { requestLogger } from "./src/Middleware/logger.js";

const app = express();
const port = 3000;

// Lee el valor del flag desde variables de entorno o configuración
const logRequests = process.env.LOG_REQUESTS === "true";

// Middleware de registro
app.use(requestLogger(logRequests));

// Configuración para recibir datos JSON
app.use(express.json());

// Usar todas las rutas
app.use("/api", routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
