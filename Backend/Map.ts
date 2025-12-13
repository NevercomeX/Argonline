import { WebSocketServer } from "ws";
import configureRoutes from "./src/Connections/Routes/mapRoutes";
import { sendJson } from "./src/Connections/Middleware/wsbigIntMiddleware";
import { logo } from "./logo";

const PORT = 4003;
const wss = new WebSocketServer({ port: PORT });
const clients = new Map(); // Almacena clientes suscritos por characterId

// Registro global de manejadores de mensajes (handlers)
const messageHandlers: any = {};

// Configurar handlers de los distintos módulos
configureRoutes(messageHandlers);

wss.on("connection", (ws) => {
  console.log("✅ Nuevo jugador conectado en el mapa");

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      const handler = messageHandlers[parsedMessage.type];

      if (handler) {
        handler(ws, parsedMessage);
      } else {
        console.warn("⚠️ Tipo de mensaje desconocido:", parsedMessage.type);
        sendJson(ws, { error: "Tipo de mensaje desconocido." });
      }
    } catch (error) {
      console.error("❌ Error procesando mensaje:", error);
      sendJson(ws, { error: "Mensaje inválido" });
    }
  });

  ws.on("close", () => {
    console.log("🔴 Jugador desconectado del mapa");
    clients.delete(ws);
  });
});

// Envía actualizaciones a los clientes suscritos
export const broadcastCharacterUpdate = (characterId: any, updateData: any) => {
  wss.clients.forEach((client) => {
    if (clients.get(client) === characterId && client.readyState === WebSocket.OPEN) {
      sendJson(client, { type: "characterUpdate", characterId, ...updateData });
    }
  });
};

logo(PORT, "MAP");
