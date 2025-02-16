// src/Connections/Routes/websocketRoutes/equipmentRoutes.js
import {
  getEquipment,
  getEquipmentById,
  getEquipmentSlotsByCharacterId,
  getEquipmentSlotByCharacterIdAndSlot,
  unequipItem,
  equipItem,
  getEquipmentMenu,
} from "../../Controllers/index.js";

// Función de broadcast para enviar actualizaciones a todos los clientes conectados
const broadcastEquipmentUpdate = (wss, characterId, action, slot, itemId) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = WebSocket.OPEN
      client.send(
        JSON.stringify({
          type: "equipmentUpdate",
          characterId,
          action,  // Acción realizada (equip, unequip)
          slot,
          itemId,
        })
      );
    }
  });
};

/**
 * Registra los handlers de mensajes relacionados al equipamiento.
 * Cada handler es una función asíncrona que procesa el mensaje recibido vía WebSocket.
 *
 * @param {object} handlers - Objeto global donde se registran los handlers.
 */
export default function equipmentRoutes(handlers) {
  // Obtener todos los equipamientos
  handlers["getEquipment"] = async (ws, message, wss) => {
    try {
      const equipment = await getEquipment();
      ws.send(
        JSON.stringify({
          type: "getEquipmentResponse",
          success: true,
          equipment,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el equipamiento",
        })
      );
    }
  };

  // Obtener equipamiento por ID
  handlers["getEquipmentById"] = async (ws, message, wss) => {
    const { id } = message;
    try {
      const equipment = await getEquipmentById(Number(id));
      if (equipment) {
        ws.send(
          JSON.stringify({
            type: "getEquipmentByIdResponse",
            success: true,
            equipment,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: "error",
            error: "Equipamiento no encontrado",
          })
        );
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el equipamiento",
        })
      );
    }
  };

  // Obtener los slots de equipamiento por ID de personaje
  handlers["getEquipmentSlotsByCharacterId"] = async (ws, message, wss) => {
    const { characterId } = message;
    try {
      const equipmentSlots = await getEquipmentSlotsByCharacterId(Number(characterId));
      ws.send(
        JSON.stringify({
          type: "getEquipmentSlotsByCharacterIdResponse",
          success: true,
          equipmentSlots,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener los slots de equipamiento",
        })
      );
    }
  };

  // Obtener el menú de equipamiento de un personaje
  handlers["getEquipmentMenu"] = async (ws, message, wss) => {
    const { characterId } = message;
    try {
      const menu = await getEquipmentMenu(Number(characterId));
      ws.send(
        JSON.stringify({
          type: "getEquipmentMenuResponse",
          success: true,
          menu,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el menú de equipamiento",
        })
      );
    }
  };

  // Desequipar ítem (se espera recibir characterId y slotType)
  handlers["unequipItem"] = async (ws, message, wss) => {
    const { characterId, slotType } = message;
    try {
      await unequipItem(Number(characterId), slotType);
      ws.send(
        JSON.stringify({
          type: "unequipItemResponse",
          success: true,
          message: "Ítem desequipado correctamente.",
        })
      );
      // Enviar actualización vía WebSocket a todos los clientes
      broadcastEquipmentUpdate(wss, Number(characterId), "unequip", slotType, null);
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: error.message,
        })
      );
    }
  };

  // Equipar ítem (se espera recibir characterId, slot, itemId y opcionalmente itemInstanceId)
  handlers["equipItem"] = async (ws, message, wss) => {
    const { characterId, slot, itemId, itemInstanceId } = message;
    try {
      await equipItem(Number(characterId), slot, itemId, itemInstanceId);
      ws.send(
        JSON.stringify({
          type: "equipItemResponse",
          success: true,
          message: "Ítem equipado correctamente.",
        })
      );
      // Enviar actualización vía WebSocket a todos los clientes
      broadcastEquipmentUpdate(wss, Number(characterId), "equip", slot, itemId);
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: error.message,
        })
      );
    }
  };

  // Obtener el ítem equipado en un slot específico para un personaje
  handlers["getEquipmentSlot"] = async (ws, message, wss) => {
    const { characterId, slotType } = message;
    try {
      const equipmentSlot = await getEquipmentSlotByCharacterIdAndSlot(Number(characterId), slotType);
      if (!equipmentSlot) {
        ws.send(
          JSON.stringify({
            type: "error",
            error: `No se encontró equipamiento para el personaje ${characterId} en el slot ${slotType}`,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: "getEquipmentSlotResponse",
            success: true,
            equipmentSlot,
          })
        );
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: "error",
          error: `Error al obtener equipamiento: ${error.message}`,
        })
      );
    }
  };
}
