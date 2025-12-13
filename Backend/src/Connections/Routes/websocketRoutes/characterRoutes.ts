// src/Connections/Routes/websocketRoutes/characterRoutes.js
import {
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  getCharactersByUserId,
  createCharacterWithAttributes,
} from "../../Controllers/index";

// Función para enviar actualizaciones en tiempo real vía WebSocket
const broadcastCharacterUpdate = (wss: any, characterId: any, action: any) => {
  wss.clients.forEach((client: any) => {
    if (client.readyState === 1) { // 1 = WebSocket.OPEN
      client.send(
        JSON.stringify({
          type: "characterUpdate",
          characterId,
          action, // Acción realizada (create, update, etc.)
        })
      );
    }
  });
};

/**
 * Registra los handlers de mensajes relacionados a personajes.
 * Cada handler es una función asíncrona que procesa un mensaje y responde vía WebSocket.
 * 
 * @param {object} handlers - Objeto global donde se registran los handlers.
 */
export default function characterRoutes(handlers: any) {
  // Obtener todos los personajes de un usuario con paginación
  handlers["getUserCharacters"] = async (ws: any, message: any, wss: any) => {
    const { userId, page } = message;
    try {
      const characters = await getCharactersByUserId(userId, parseInt(page as string));
      ws.send(
        JSON.stringify({
          type: "getUserCharactersResponse",
          success: true,
          characters,
        })
      );
    } catch (error) {
      console.error("Error al obtener los personajes:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener los personajes",
        })
      );
    }
  };

  // Obtener todos los personajes (con paginación)
  handlers["getAllCharacters"] = async (ws: any, message: any, wss: any) => {
    const page = parseInt(message.page) || 1;
    const limit = parseInt(message.limit) || 9;
    try {
      const data = await getAllCharacters(page, limit);
      ws.send(
        JSON.stringify({
          type: "getAllCharactersResponse",
          success: true,
          data,
        })
      );
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener personajes",
        })
      );
    }
  };

  // Obtener un personaje por ID
  handlers["getCharacterById"] = async (ws: any, message: any, wss: any) => {
    const { id } = message;
    try {
      const character = await getCharacterById(id);
      if (character) {
        ws.send(
          JSON.stringify({
            type: "getCharacterByIdResponse",
            success: true,
            character,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            type: "error",
            error: "Personaje no encontrado",
          })
        );
      }
    } catch (error) {
      console.error("Error al obtener el personaje:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al obtener el personaje",
        })
      );
    }
  };

  // Actualizar un personaje por ID (con soporte WebSocket)
  handlers["updateCharacter"] = async (ws: any, message: any, wss: any) => {
    const { id, data } = message;
    try {
      const updatedCharacter = await updateCharacter(id, data);
      ws.send(
        JSON.stringify({
          type: "updateCharacterResponse",
          success: true,
          updatedCharacter,
        })
      );
      // Enviar actualización vía WebSocket a todos los clientes conectados
      broadcastCharacterUpdate(wss, id, "update");
    } catch (error) {
      console.error("Error al actualizar el personaje:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al actualizar el personaje",
        })
      );
    }
  };

  // Crear un personaje con atributos (con soporte WebSocket)
  handlers["createCharacter"] = async (ws: any, message: any, wss: any) => {
    const { userId, name, jobClass, attributes, gender } = message;
    try {
      const newCharacter = await createCharacterWithAttributes(
        userId,
        name,
        jobClass,
        attributes
      );
      ws.send(
        JSON.stringify({
          type: "createCharacterResponse",
          success: true,
          newCharacter,
        })
      );
      // Notificar a todos los clientes sobre la creación del nuevo personaje
      broadcastCharacterUpdate(wss, newCharacter.id, "create");
    } catch (error) {
      console.error("Error al crear el personaje:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          error: "Error al crear el personaje",
        })
      );
    }
  };
}
