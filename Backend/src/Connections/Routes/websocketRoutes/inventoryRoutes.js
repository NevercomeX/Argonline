// src/Connections/Routes/websocketRoutes/inventoryRoutes.js
import {
  getInventory,
  getInventoryById,
  addItemToInventory,
  removeItemFromInventory,
  getStorageItemById,
} from "../../Controllers/index.js";

// Función para enviar actualizaciones en tiempo real vía WebSocket
const broadcastInventoryUpdate = (wss, characterId, action, itemId, quantity) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = WebSocket.OPEN
      client.send(
        JSON.stringify({
          type: "inventoryUpdate",
          characterId,
          action,  // Acción realizada (add, remove)
          itemId,
          quantity,
        })
      );
    }
  });
};

/**
 * Registra los handlers de mensajes relacionados al inventario.
 *
 * @param {object} handlers - Objeto global donde se registran los handlers.
 */
export default function inventoryRoutes(handlers) {
  // Obtener inventario completo de un personaje
  // Se espera que el mensaje contenga: { type: "getInventory", characterId }
  handlers["getInventory"] = async (ws, message, wss) => {
    const { characterId } = message;
    try {
      const inventory = await getInventory(parseInt(characterId));
      ws.send(
        JSON.stringify({
          type: "getInventoryResponse",
          success: true,
          inventory,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el inventario",
        })
      );
    }
  };

  // Obtener ítem específico del inventario por ID
  // Se espera que el mensaje contenga: { type: "getInventoryItem", id }
  handlers["getInventoryItem"] = async (ws, message, wss) => {
    const { id } = message;
    try {
      const inventoryItem = await getInventoryById(parseInt(id));
      if (inventoryItem) {
        ws.send(
          JSON.stringify({
            type: "getInventoryItemResponse",
            success: true,
            inventoryItem,
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
          error: "Error al obtener el ítem del inventario",
        })
      );
    }
  };

  // Añadir un ítem al inventario
  // Se espera que el mensaje contenga: { type: "addItemToInventory", characterId, itemId, quantity }
  handlers["addItemToInventory"] = async (ws, message, wss) => {
    const { characterId, itemId, quantity } = message;
    try {
      await addItemToInventory(parseInt(characterId), itemId, quantity);
      ws.send(
        JSON.stringify({
          type: "addItemToInventoryResponse",
          success: true,
          message: `Ítem añadido al inventario del personaje ${characterId}`,
        })
      );
      // Enviar actualización vía WebSocket a todos los clientes conectados
      broadcastInventoryUpdate(wss, parseInt(characterId), "add", itemId, quantity);
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: `Error al añadir ítem al inventario: ${error.message}`,
        })
      );
    }
  };

  // Remover un ítem del inventario
  // Se espera que el mensaje contenga: { type: "removeItemFromInventory", characterId, itemId, quantity }
  handlers["removeItemFromInventory"] = async (ws, message, wss) => {
    const { characterId, itemId, quantity } = message;
    try {
      await removeItemFromInventory(parseInt(characterId), itemId, quantity);
      ws.send(
        JSON.stringify({
          type: "removeItemFromInventoryResponse",
          success: true,
          message: `Ítem eliminado del inventario del personaje ${characterId}`,
        })
      );
      // Enviar actualización vía WebSocket a todos los clientes conectados
      broadcastInventoryUpdate(wss, parseInt(characterId), "remove", itemId, quantity);
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: `Error al eliminar ítem del inventario: ${error.message}`,
        })
      );
    }
  };

  // Obtener el inventario (almacenamiento) de un personaje por ID
  // Se espera que el mensaje contenga: { type: "getStorageItem", id }
  handlers["getStorageItem"] = async (ws, message, wss) => {
    const { id } = message;
    try {
      const characterInventory = await getStorageItemById(parseInt(id));
      ws.send(
        JSON.stringify({
          type: "getStorageItemResponse",
          success: true,
          characterInventory,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: `Error al obtener el inventario del personaje: ${error.message}`,
        })
      );
    }
  };
}
