import express from "express";
import routes from "./src/Connections/Routes/charRoutes"; 
import { requestLogger } from "./src/Connections/Middleware/logger";
import jsonBigIntMiddleware from "./src/Connections/Middleware/jsonBigIntMiddleware";
import cors from "cors";
import { logo } from "./logo";

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

// Middleware para serializar BigInt en JSON
app.use(jsonBigIntMiddleware);

// Configuración para recibir datos JSON
app.use(express.json());

// Usar todas las rutas
app.use("/char", routes);

// Iniciar el servidor
app.listen(port, () => {
logo(port, "CHAR");
});
