import { GuildMember } from './GuildMember';
import { Character } from './Character';

export interface Guild {
  id: number;
  name: string;
  leaderId: number;
  level: number;
  members?: GuildMember[];
  createdAt: Date;
  leader?: Character;
}
