import { getInitialData } from "../../Controllers/initialData.js";
import { sendJson } from "../../Middleware/wsbigIntMiddleware.js";

export default function initialDataRoutes(handlers: any) {
  handlers["join"] = async (ws: any, message: any) => {
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
