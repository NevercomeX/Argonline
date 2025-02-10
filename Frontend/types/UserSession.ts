import { User } from "@/types/User";

export type UserSession = {
  id: string;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  user: User;
};