// combatServer.js
import { WebSocketServer } from "ws";
import { handleBattleAction } from "./src/Connections/Controllers/Combat/combatController.js";
import { handleCombatStatsRequest } from "./src/Connections/Controllers/Stats/statsCalculatorController.js";

const port = 4003;
const wss = new WebSocketServer({ port });

console.log("🔥 COMBAT SERVER RUNNING ON PORT:", port);

const battles = new Map(); // Almacena batallas activas en memoria

wss.on("connection", (ws) => {
  console.log("✅ Nuevo jugador conectado");

  ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log("📩 [RECEIVED]", parsedMessage);

      if (parsedMessage.type === "battleAction") {
        await handleBattleAction(parsedMessage, ws, battles);
      }
    } catch (error) {
      console.error("❌ Error procesando mensaje:", error);
      ws.send(JSON.stringify({ error: "Mensaje inválido" }));
    }
  });

    ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === "combatStats") {
        await handleCombatStatsRequest(ws, parsedMessage);
      }
    } catch (error) {
      console.error("Error procesando mensaje:", error);
      ws.send(JSON.stringify({ error: "Mensaje inválido." }));
    }
  });

  ws.on("close", () => console.log("🔴 Jugador desconectado"));
});
