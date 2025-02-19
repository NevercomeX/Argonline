// src/utils/gameUtils/statsApi.ts
import { CombatStats } from "@/types/CombatStats";

export async function getStatsCharacter(characterId: number): Promise<CombatStats> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_CHAR_URL}/stats/${characterId}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`Error fetching character stats: ${response.statusText}`);
  }
  return response.json();
}

