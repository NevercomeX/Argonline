// src/Connections/Routes/mapRoutes.js

import characterRoutes from "./websocketRoutes/characterRoutes.js";
import itemRoutes from "./websocketRoutes/itemRoutes.js";
import equipmentRoutes from "./websocketRoutes/equipmentRoutes.js";
import inventoryRoutes from "./websocketRoutes/inventoryRoutes.js";
import initialDataRoutes from "./websocketRoutes/initialDataRoutes.js";
import enemiesRoutes from "./websocketRoutes/enemiesRoutes.js";
import userRoutes from "./websocketRoutes/userRouter.js";
import skillRoutes from "./websocketRoutes/skillRoutes.js";

// La función recibe el objeto "handlers" y cada módulo se encarga de registrar sus manejadores.
const configureRoutes = (handlers) => {
  characterRoutes(handlers);
  itemRoutes(handlers);
  equipmentRoutes(handlers);
  inventoryRoutes(handlers);
  initialDataRoutes(handlers);
  // enemiesRoutes(handlers);
  // userRoutes(handlers);
  // skillRoutes(handlers);
};

export default configureRoutes;
