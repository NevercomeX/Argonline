// src/middleware/wsBigIntMiddleware.js

export function bigIntReplacer(key: any, value: any) {
  return typeof value === "bigint" ? value.toString() : value;
}

export function sendJson(ws: any, data: any) {
  try {
    const formattedData = JSON.stringify(data, bigIntReplacer);
    ws.send(formattedData);
  } catch (error) {
    console.error("❌ Error serializando JSON para WebSocket:", error);
  }
}
