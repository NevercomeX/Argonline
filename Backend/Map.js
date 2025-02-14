// combatServer.js (Usando WebSocket puro)
import { WebSocketServer } from "ws";
import { handleCombatStatsRequest } from "./src/Connections/Controllers/Stats/statsCalculatorController.js";

const port = 4004; // Puerto exclusivo para combate

// Inicializar WebSocket Server
const wss = new WebSocketServer({ port });

console.log("                                             ");
console.log("       Nevercomex Development Team Presents:");
console.log(`
             ███╗   ██╗  ██╗  ██╗                    
             ████╗  ██║  ╚██╗██╔╝                    
             ██╔██╗ ██║   ╚███╔╝                     
             ██║╚██╗██║   ██╔██╗                     
             ██║ ╚████║  ██╔╝ ██╗                    
             ╚═╝  ╚═══╝  ╚═╝  ╚═╝                    
`);
console.log("                COMBAT SERVER (WebSocket)");
console.log(" ====================================================");
console.log(` =   Server [COMBAT] is running on port: ${port}          =`);
console.log(" ====================================================");
console.log("                                             ");

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

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

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
