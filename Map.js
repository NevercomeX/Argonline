ws.on("message", (message) => {
  const data = JSON.parse(message);
  if (data.type === "move") {
    moveCharacter(data.characterId, data.newPosition);
    // Notificar a otros jugadores en el mismo mapa
    notifyOthersInMap(data.characterId, data.newPosition);
  }
});
