import { Item } from "@/types/Item";
import { JobName } from "@/types/Enums/JobNameEnum";

export type Recipe = {
  id: number;
  resultItemId: number;
  requiredItems: any; // JSON
  successRate: number;
  skillRequired?: string;
  jobRequired?: JobName;
  minLevel?: number;
  item: Item;
};