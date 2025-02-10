import { Character } from "@/types/Character";
import { Guild } from "@/types/Guild";

export type GuildMember = {
  id: number;
  guildId: number;
  characterId: number;
  rank: string;
  position: string;
  guild: Guild;
  character: Character;
};