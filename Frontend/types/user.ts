import { Character } from "./Character";
import { StorageItem } from "./StorageItem";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  zeny: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  characters: Character[];
  storage: StorageItem[];
};
