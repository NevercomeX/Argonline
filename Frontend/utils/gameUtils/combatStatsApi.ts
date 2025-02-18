// src/utils/gameUtils/combatStatsApi.ts
export const getCombatStats = async (characterId: number, forceUpdate: boolean) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_CHAR_URL}/combat-stats/${characterId}?forceUpdate=${forceUpdate}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Error fetching combat stats");
  }
  return res.json();
};
