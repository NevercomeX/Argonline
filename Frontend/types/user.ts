import { Character } from "./character";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  characters: Character[];
}
