// src/Connections/Routes/websocketRoutes/itemRoutes.js
import {
  getAllItems,
  getItemById,
  getItemNameById,
} from "../../Controllers/index";

/**
 * Registra los handlers de mensajes relacionados a los ítems.
 *
 * Se espera que el cliente envíe mensajes con el siguiente formato:
 * - Obtener todos los ítems:
 *   { type: "getAllItems", page: <número>, limit: <número> }
 *
 * - Obtener un ítem por ID:
 *   { type: "getItemById", id: <id del ítem> }
 *
 * - Obtener el nombre de un ítem por ID:
 *   { type: "getItemNameById", id: <id del ítem> }
 *
 * Cada handler procesa el mensaje y envía la respuesta vía WebSocket.
 *
 * @param {object} handlers - Objeto global donde se registran los handlers.
 */
export default function itemRoutes(handlers: any) {
  // Handler para obtener todos los ítems (con paginación)
  handlers["getAllItems"] = async (ws: any, message: any, wss: any) => {
    try {
      const page = parseInt(message.page) || 1;
      const limit = parseInt(message.limit) || 9;
      const data = await getAllItems(page, limit);
      ws.send(
        JSON.stringify({
          type: "getAllItemsResponse",
          success: true,
          data,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener los ítems",
        })
      );
    }
  };

  // Handler para obtener un ítem por su ID
  handlers["getItemById"] = async (ws: any, message: any, wss: any) => {
    const { id } = message;
    try {
      const item = await getItemById(id);
      if (item) {
        ws.send(
          JSON.stringify({
            type: "getItemByIdResponse",
            success: true,
            item,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: "error",
            error: "Ítem no encontrado",
          })
        );
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el ítem",
        })
      );
    }
  };

  // Handler para obtener el nombre de un ítem por su ID
  handlers["getItemNameById"] = async (ws: any, message: any, wss: any) => {
    const { id } = message;
    try {
      const itemName = await getItemNameById(id);
      ws.send(
        JSON.stringify({
          type: "getItemNameByIdResponse",
          success: true,
          name: itemName,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el nombre del ítem",
        })
      );
    }
  };
}
