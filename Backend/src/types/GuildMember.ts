import { Guild } from './Guild';
import { Character } from './Character';

export interface GuildMember {
  id: number;
  guildId: number;
  characterId: number;
  rank: string;
  position: string;
  guild?: Guild;
  character?: Character;
}
