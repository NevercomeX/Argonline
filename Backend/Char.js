import express from "express";
import routes from "./src/Routes/index.js";
import { requestLogger } from "./src/Middleware/logger.js";
import cors from "cors";

const app = express();
const port = 4001;

// Lee el valor del flag desde variables de entorno o configuración
const logRequests = process.env.LOG_REQUESTS === "true";

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:3000", // Dominios permitidos (Remix app)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  credentials: true, // Permitir credenciales (si necesitas cookies)
};

// Middleware de CORS
app.use(cors(corsOptions));

// Middleware de registro
app.use(requestLogger(logRequests));

// Configuración para recibir datos JSON
app.use(express.json());

// Usar todas las rutas
app.use("/api", routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server [CHAR] is running on http://localhost:${port}`);
});
