import { User } from './User';

export interface UserSession {
  id: string;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  user?: User;
}
