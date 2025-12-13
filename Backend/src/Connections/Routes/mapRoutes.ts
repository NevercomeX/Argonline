// src/Connections/Routes/mapRoutes.js

import characterRoutes from "./websocketRoutes/characterRoutes";
import itemRoutes from "./websocketRoutes/itemRoutes";
import equipmentRoutes from "./websocketRoutes/equipmentRoutes";
import inventoryRoutes from "./websocketRoutes/inventoryRoutes";
import initialDataRoutes from "./websocketRoutes/initialDataRoutes";

// La función recibe el objeto "handlers" y cada módulo se encarga de registrar sus manejadores.
const configureRoutes = (handlers: any) => {
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
