import { Character } from "@/types/Character";
import { GuildMember } from "@/types/GuildMember";

export type Guild = {
  id: number;
  name: string;
  leaderId: number;
  level: number;
  members: GuildMember[];
  createdAt: Date;
  leader: Character;
};