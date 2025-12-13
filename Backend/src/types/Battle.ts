export interface Battle {
  id: number;
  player1: number;
  player2: number;
  currentTurn: number;
  winner?: number | null;
  status: string;
}
