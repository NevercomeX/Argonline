import { Character } from './Character';
import { StorageItem } from './StorageItem';
import { UserSession } from './UserSession';

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: string;
  characters?: Character[];
  storage?: StorageItem[];
  zeny: number;
  userSession?: UserSession[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
