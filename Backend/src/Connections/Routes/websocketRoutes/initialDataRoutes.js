import { getInitialData } from "../../Controllers/initialData.js";
import { sendJson } from "../../Middleware/wsbigIntMiddleware.js";

export default function initialDataRoutes(handlers) {
  handlers["join"] = async (ws, message) => {
    const { characterId } = message;
    try {
      const data = await getInitialData(characterId);
      sendJson(ws, {
        type: "getInitialDataResponse",
        success: true,
        characterId,
        data,
      });
    } catch (error) {
      console.error("❌ Error al obtener los datos iniciales:", error);
      sendJson(ws, {
        type: "error",
        error: "Error al obtener los datos iniciales",
      });
    }
  };
}
